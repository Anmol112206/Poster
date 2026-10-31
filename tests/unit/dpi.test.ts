import { describe, it, expect } from "vitest";
import { calculateDPI, getDPIQuality, formatINR } from "@/lib/utils";

describe("Print DPI and Formatting Utilities", () => {
  it("computes accurate DPI for A4 dimensions (210x297mm)", () => {
    // 2480 x 3508 px for A4 (11.69 inches height) -> ~300 DPI
    const dpi = calculateDPI(2480, 3508, "A4");
    expect(dpi).toBeGreaterThanOrEqual(295);
    expect(dpi).toBeLessThanOrEqual(305);

    const quality = getDPIQuality(dpi);
    expect(quality.label).toBe("Great");
    expect(quality.isWarning).toBe(false);
  });

  it("identifies low DPI quality warning below 150 DPI", () => {
    // 1000 x 1414 px for A3 (16.54 inches height) -> ~85 DPI
    const dpi = calculateDPI(1000, 1414, "A3");
    expect(dpi).toBeLessThan(150);

    const quality = getDPIQuality(dpi);
    expect(quality.label).toBe("Low");
    expect(quality.isWarning).toBe(true);
  });

  it("formats integer paise to INR correctly", () => {
    expect(formatINR(7000)).toBe("₹70");
    expect(formatINR(12000)).toBe("₹120");
    expect(formatINR(69900)).toBe("₹699");
  });
});
