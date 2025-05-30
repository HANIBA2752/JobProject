const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

/**
 * [GET] /api/jobs (Query all jobs) ✅
 * [GET] /api/jobs/:id (Query info job) ✅
 * [GET] /api/query/position (Get all position [FOR SEARCH]) ✅
 * [GET] /api/query/position-group (Get all position group) ✅
 *
 */

// ✅ ดึงตำแหน่งงานทั้งหมด
app.get("/api/jobs", async (req, res) => {
  let {
    page = 0,
    size = 13,
    sortTrending = "asc",
    groupOfPos = "",
    search = "",
    language = "",
  } = req.query;
  if (size >= 100) size = 100;
  console.log(`Trending: ${sortTrending} | Group pos IDS: ${groupOfPos}`);
  // Transform data group
  // 0,1,2,3,4 => ['0','1','2','3','4'] => [0,1,2,3,4] => [1,2,3,4]
  const groupIds = groupOfPos // 0,1,2,3,4
    .split(",") // ['0','1','2','3','4']
    .map((i) => Number(i)) //  [0,1,2,3,4]
    .filter((i) => i > 0); // [1,2,3,4]

  const queryBase = {
    ...(groupIds.length > 0
      ? {
          position: {
            group_id: {
              in: groupIds,
            },
          },
        }
      : {}),
    ...(language !== ""
      ? {
          position: {
            job_skills: {
              some: {
                skill_id: Number(language),
              },
            },
          },
        }
      : {}),
  };

  const whereQuery = {
    ...(search != ""
      ? {
          OR: [
            {
              position: {
                name: {
                  contains: search,
                },
              },
            },
            {
              position: {
                job_skills: {
                  some: {
                    skills: {
                      name: {
                        contains: search,
                      },
                    },
                  },
                },
              },
            },
          ],
          ...queryBase,
        }
      : {
          ...queryBase,
        }),
  };

  const jobs = await prisma.position_details.findMany({
    skip: page * size, // you were skipping 0 before; now dynamic
    take: Number(size),
    where: whereQuery, // <-- this applies your filters
    orderBy: {
      trending: {
        level: sortTrending,
      },
    },
    select: {
      id: true,
      description: true,
      created_at: true,
      updated_at: true,
      trending: {
        select: { name: true },
      },
      position: {
        select: {
          id: true,
          name: true,
          group_id: true,
          job_skills: {
            select: {
              job_id: true,
              skill_id: true,
              score: true,
              skills: {
                select: {
                  id: true,
                  name: true,
                  group: true,
                },
              },
            },
          },
        },
      },
    },
  });

  console.log(JSON.stringify(jobs, null, 2)); // Pretty print result
  // Get total job query
  const totalData = await prisma.position_details.count({
    where: whereQuery,
  });

  res.json({
    items: jobs,
    pagination: {
      total: totalData,
      pageTotal: Math.trunc(totalData / size),
    },
  });
});

// ✅ ดึงข้อมูลตำแหน่งงานเฉพาะ ID
app.get("/api/jobs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const job = await prisma.position_details.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        trending: { select: { name: true } },
        created_at: true,
        updated_at: true,
        description: true,
        responsibilities: true,
        position: {
          select: {
            id: true,
            name: true,
            group_id: true,
            job_skills: {
              select: {
                job_id: true,
                skill_id: true,
                score: true,
                skills: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    console.log(JSON.stringify(job, null, 2));
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/query/position", async (req, res) => {
  const result = await prisma.position.findMany({
    select: { id: true, name: true },
  });
  res.json(result);
});

app.get("/api/query/position-group", async (req, res) => {
  const result = await prisma.position_group.findMany({
    select: { id: true, name: true },
  });
  res.json(result);
});

app.get("/api/query/mainpageScore", async (req, res) => {
  const result = await prisma.job_skills.findMany({
    select: {
      score: true,
      skills: {
        select: {
          name: true,
        },
      },
    },
  });
  const transformed = result.map((item) => ({
    skill: item.skills?.name ?? "Unknown", // เผื่อกรณี null
    score: item.score,
  }));

  res.json(transformed);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});