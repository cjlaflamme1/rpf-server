export class CreateClimbAvailabilityGenDto {
  day: string;
  startHour: number;
  startMinute: number;
  startAMPM: 'AM' | 'PM';
  finishHour: number;
  finishMinute: number;
  finishAMPM: 'AM' | 'PM';
  areas: string[];
}
