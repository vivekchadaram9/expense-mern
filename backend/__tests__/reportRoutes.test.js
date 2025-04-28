const request = require("supertest");
const express = require("express");
const reportRoutes = require("../routes/reportRoutes");
const Report = require("../models/reportModel");
const app = express();

app.use(express.json());
app.use("/api/reports", reportRoutes);

jest.mock("../models/reportModel");

describe("Report Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /getByUserId", () => {
    it("should return reports by userId", async () => {
      const mockReports = [{ user_id: "123", title: "Test Report" }];
      Report.find.mockResolvedValue(mockReports); 

      const res = await request(app).get("/api/reports/getByUserId?userId=123");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual(mockReports);
    });

    it("should return 400 if no reports are found", async () => {
      Report.find.mockResolvedValue([]);

      const res = await request(app).get("/api/reports/getByUserId?userId=123");
        console.log(res,"res")
      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Reports not found");
    });

    it("should return 500 on server error", async () => {
      Report.find.mockRejectedValue(new Error("Server error"));

      const res = await request(app).get("/api/reports/getByUserId?userId=123");

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Server error");
    });
  });

  describe("GET /getByReportId", () => {
    it("should return report by reportId", async () => {
      const mockReport = { _id: "123", title: "Test Report" };
      Report.findById.mockResolvedValue(mockReport);

      const res = await request(app).get(
        "/api/reports/getByReportId?reportId=123"
      );

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockReport);
    });

    it("should return 400 if report is not found", async () => {
      Report.findById.mockResolvedValue(null);

      const res = await request(app).get(
        "/api/reports/getByReportId?reportId=123"
      );

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Report not found");
    });

    it("should return 500 on server error", async () => {
      Report.findById.mockRejectedValue(new Error("Server error"));

      const res = await request(app).get(
        "/api/reports/getByReportId?reportId=123"
      );

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Server error");
    });
  });

  describe("POST /saveReport", () => {
    it("should create and return a new report", async () => {
      const newReport = { title: "Test Report", user_id: "123" };
      Report.create.mockResolvedValue(newReport);

      const res = await request(app)
        .post("/api/reports/saveReport")
        .send(newReport);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual(newReport);
    });

    it("should return 400 for validation errors", async () => {
      Report.create.mockRejectedValue({
        name: "ValidationError",
        errors: { title: { message: "Title is required" } },
      });

      const res = await request(app).post("/api/reports/saveReport").send({});

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.errors).toEqual(["Title is required"]);
    });

    it("should return 500 on server error", async () => {
      Report.create.mockRejectedValue(new Error("Server error"));

      const res = await request(app)
        .post("/api/reports/saveReport")
        .send({ title: "Test Report" });

      expect(res.status).toBe(500);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Server Error");
    });
  });
});
