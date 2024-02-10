//create a class to apply the date format to the date fields, it must be used in the create and update methods of the service, and be interchangeable in accord with the entity that is being used
// Path: src/utils/dateFormat.ts
import moment from 'moment';
export class DateFormat {
  public static apply(date: string | Date): string {
    if (date == null) return null;
    return moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
  }
}
