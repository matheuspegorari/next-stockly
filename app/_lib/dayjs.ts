import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import "server-only";

dayjs.extend(utc);
dayjs.extend(timezone);

export default dayjs;
