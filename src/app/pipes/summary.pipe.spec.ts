import { SummaryPipe } from "./summary.pipe";

xdescribe("SummaryPipe", () => {
  it("create an instance", () => {
    const pipe = new SummaryPipe();
    expect(pipe).toBeTruthy();
  });
});
