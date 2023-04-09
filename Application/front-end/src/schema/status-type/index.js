import { Enumify } from "enumify";

class StatusType extends Enumify {
  static DELETED = new StatusType({
    get displayValue() {
      return "DELETED";
    },
  });
  static ACTIVE = new StatusType({
    get displayValue() {
      return "ACTIVE";
    },
  });
  static _ = this.closeEnum();

  constructor(props) {
    super();
    Object.defineProperties(this, Object.getOwnPropertyDescriptors(props));
  }
}

export default StatusType;
