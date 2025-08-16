import dayjs from 'dayjs';
// import jalali from 'jalali-dayjs';

// گسترش dayjs با پلاگین jalali
// dayjs.extend(jalali);

export function toJalali(
  dateString: string, 
  format: string = "jYYYY/jMM/jDD HH:mm"
) {
  if (!dateString) {
    return "";
  }
  
  // تبدیل به تاریخ جلالی و تنظیم locale به فارسی
  return dayjs(dateString)
    // .calendar('jalali')
    .locale('fa')
    .format(format);
}