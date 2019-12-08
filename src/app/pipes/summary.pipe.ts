import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "summary"
})
export class SummaryPipe implements PipeTransform {
  transform(value: string, limit?: number): any {
    const actualLimit = limit ? limit : 50;
    const summary = value.substr(0, actualLimit);
    return `${summary}...`;
  }
}
