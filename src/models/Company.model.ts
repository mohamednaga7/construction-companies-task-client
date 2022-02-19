import { Specialty } from './Specialty.enum';
export interface ICompany {
	id: string;
	companyName: string;
	logo: string;
	specialty: Specialty;
	city: string;
}
