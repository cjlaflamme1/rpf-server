export class IncomingUserDTO {
  email: string;
  password: string;
  matchingPw: boolean;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  trOnly: boolean;
  lead: boolean;
  boulder: boolean;
  trWarmUp: string;
  trOnsight: string;
  trRedpoint: string;
  leadWarmUp: string;
  leadOnsight: string;
  leadRedpoint: string;
  boulderWarmUp: string;
  boulderOnsight: string;
  boulderRedpoint: string;
  preferredCrags: string;
  imageFileName?: string;
  imageFileType?: string;
}
