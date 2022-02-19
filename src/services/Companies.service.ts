import { ICompany } from '../models/Company.model';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '/api';

interface IGetCompaniesResponse {
	companies: ICompany[];
	pagesCount: number;
}

export const getAllCompanies = (() => {
	let latestResponse: IGetCompaniesResponse | undefined;
	let isCurrentlyFetching = false;
	return async (
		page: number,
		limit: number,
		companyName?: string,
		specialties?: string
	) => {
		if (isCurrentlyFetching) {
			return latestResponse;
		}
		isCurrentlyFetching = true;
		let url = `${API_URL}/companies?page=${page}&limit=${limit}`;
		if (companyName) {
			url += `&companyName=${companyName}`;
		}
		if (specialties) {
			url += `&specialties=${specialties}`;
		}
		try {
			const { data } = await axios.get<IGetCompaniesResponse>(url);
			latestResponse = data;
			return data;
		} catch (e) {
			console.log(e);
		} finally {
			isCurrentlyFetching = false;
		}
	};
})();
