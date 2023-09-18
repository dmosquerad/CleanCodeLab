
export class HammingCalculator {
  getDistance(a: string, b: string): number | string {
    this.checkGuards(a, b);
    this.writeInfo(`Calculating difference for ${a} - ${b}`);
    const result = this.calculateDistance(a, b);
    this.writeInfo(`Calculated difference ${result}`);
    return result;
  }

  private calculateDistance(a: string, b: string): number | string {
    let result = 0;
    if (this.isEmpty(b)) {
      return result;
    }
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        result++;
      }
    }
    return result;
  }
  
  private writeInfo(message:string) : void {
    console.log("INFO: " + message);
  }
  private writeWarn(message:string) : void{
    console.log("WARN: " + message);
  }
  private writeError(message:string) : void{
    console.log("ERROR: " + message);
  }

  private checkGuards(a: string, b: string) : void {
    if (this.isAnyNull(a,b)) {
      const errorNull = 'null not allowed';
      this.writeError(errorNull);
      throw errorNull;
    }

    if (this.isSameLength(a,b)) {
      const warnInvalid = 'invalid strings';
      this.writeWarn(warnInvalid);
      throw warnInvalid;
    }
  }
  private isAnyNull(...args): boolean {
    for (var i = 0; i < args.length; i++) {
      if (this.isNull(args[i])) {
        return true
      }
    }
    return false;
  }

  private isNull(a: string) : boolean{
    if (a !== null) {
      return false;
    }
    return true;
  }

  private isEmpty(a: string) : boolean {
    if (a.length !== 0) {
      return false;
    }
    return true;
  }

  private isSameLength(...args: string[]): boolean {
    for (var i = 0; i < args.length - 1; i++) {
      if (this.isEqualLength(args[i],args[i+1])) {
        return false;
      }
      return true;
    }
  }

  private isEqualLength(a: string, b: string) : boolean {
    if (a.length !== b.length) {
      return false;
    }
    return true;
  }

}
