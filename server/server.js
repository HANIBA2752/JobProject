const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// ✅ ดึงตำแหน่งงานทั้งหมด
app.get("/api/jobs", async (req, res) => {
  let { page = 0, size = 13 } = req.query
  if(size >= 100) size = 100

  try {
    const jobs = await prisma.jobs.findMany({
      skip: page * size,
      take: size,
      select: {
        id: true,
        trending_level: true,
        created_at: true,
        updated_at: true,
        description: true,
        position: {
          select: {
            name: true
          }
        },
        job_skills: {
          select: {
            score: true,
            skills: {
              select: {
                name: true,
                group: true,
              }
            }
          }
        }
      }
    })
    console.log(jobs)
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ ดึงข้อมูลตำแหน่งงานเฉพาะ ID
app.get("/api/jobs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const job = await prisma.jobs.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        trending_level: true,
        created_at: true,
        updated_at: true,
        description: true,
        position: {
          select: {
            name: true
          }
        },
        job_skills: {
          select: {
            score: true,
            skills: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
