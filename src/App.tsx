import React, { useCallback, useEffect, useState } from 'react';
import CompaniesFilter from './components/companies-filter/CompaniesFilter';
import CompaniesList from './components/companies-list/CompaniesList';
import { ICompany } from './models/Company.model';
import { getAllCompanies } from './services/Companies.service';

const App: React.FC = () => {
	const [companies, setCompanies] = useState<ICompany[]>([]);
	const [loadingCompanies, setLoadingCompanies] = useState<boolean>(false);
	const [page, setPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState<number>(10);
	const [nameFilter, setNameFilter] = useState<string>('');
	const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);

	/**
	 * Fetch companies from API and set them to state
	 * called whenever the app needs to fetch more companies of filter them
	 */
	const fetchCompanies = useCallback(
		async (page, limit, nameFilter, selectedSpecialties) => {
			if (loadingCompanies) return;
			setLoadingCompanies(true);
			try {
				const response = await getAllCompanies(
					page,
					limit,
					nameFilter.trim() === '' ? undefined : nameFilter,
					selectedSpecialties.length > 0
						? JSON.stringify(selectedSpecialties)
						: undefined
				);
				if (response) {
					setCompanies(response.companies || []);
					setTotalPages(response.pagesCount || 0);
				}
			} catch (e) {
			} finally {
				setLoadingCompanies(false);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	useEffect(() => {
		fetchCompanies(page, limit, nameFilter, selectedSpecialties);
	}, [page, limit, nameFilter, selectedSpecialties, fetchCompanies]);

	const onSpecialtyChanged = useCallback((specialties) => {
		setSelectedSpecialties(specialties);
	}, []);

	const onNameChanged = useCallback((value) => {
		setNameFilter(value);
	}, []);

	return (
		<div className='w-screen min-h-screen mx-auto w-11/12 max-w-screen-lg pb-10'>
			<h1 className='text-gray-900 text-6xl uppercase text-center mt-5 mb-20'>
				Construction Companies
			</h1>
			<div className='flex border-2 rounded-xl overflow-hidden'>
				<CompaniesFilter
					specialtiesChanged={onSpecialtyChanged}
					nameChanged={onNameChanged}
				/>
				<CompaniesList
					companies={companies}
					loadingCompanies={loadingCompanies}
					totalPages={totalPages}
					currentPage={page}
					onChangePage={(page) => setPage(page)}
				/>
			</div>
		</div>
	);
};

export default App;
