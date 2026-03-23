export const testUtils = {
  /**
   * หน่วงเวลา (ms)
   */
  delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  /**
   * จำลอง API latency (สุ่มเวลา)
   */
  randomDelay(min = 300, max = 1500): Promise<void> {
    const ms = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  /**
   * จำลอง error (ใช้ทดสอบ error state)
   */
  async throwError(message = "Test error") {
    throw new Error(message);
  },

  /**
   * จำลอง success response
   */
  async mockSuccess<T>(data: T, delayMs = 500): Promise<T> {
    await this.delay(delayMs);
    return data;
  },

  /**
   * จำลอง fail response
   */
  async mockFail(message = "Mock fail", delayMs = 500): Promise<never> {
    await this.delay(delayMs);
    throw new Error(message);
  },
};
