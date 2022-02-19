import React from 'react';
import { ICompany } from '../../models/Company.model';
import CompaniesListItem from '../companies-list-item/CompaniesListItem';

interface ICompaniesListProps {
	companies: ICompany[];
	loadingCompanies: boolean;
	totalPages: number;
	currentPage: number;
	onChangePage: (page: number) => void;
}

const CompaniesList: React.FC<ICompaniesListProps> = ({
	companies,
	loadingCompanies,
	totalPages,
	currentPage,
	onChangePage,
}) => {
	const renderPageButtons = () => {
		const buttons = [];
		for (let i = 1; i <= totalPages; i++) {
			buttons.push(
				<button
					key={i}
					onClick={() => {
						onChangePage(i);
					}}
					className={`bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-full ml-2 mr-2 ${
						i === currentPage ? 'bg-gray-400' : ''
					}`}
				>
					{i}
				</button>
			);
		}
		return buttons;
	};
	return (
		<div className='flex-grow-[6]'>
			{loadingCompanies ? (
				<div className='flex-grow h-full w-full justify-center items-center flex'>
					<p className='text-2xl'>Loading companies...</p>
				</div>
			) : (
				<div className='flex flex-grow h-full w-full justify-between flex-col'>
					{companies.length > 0 ? (
						<div>
							{companies.map((company, index) => (
								<CompaniesListItem
									company={company}
									key={company.id}
									index={index}
								/>
							))}
						</div>
					) : (
						<div className='flex-grow h-full w-full justify-center items-center flex'>
							<p className='text-2xl text-center'>No Companies Found</p>
						</div>
					)}
					<div className='flex justify-center items-center py-4'>
						<i
							onClick={() => {
								if (currentPage > 1) {
									onChangePage(currentPage - 1);
								}
							}}
							className={[
								'fa-solid transition-colors fa-arrow-left mr-5',
								currentPage === 1 ? 'text-gray-400' : 'cursor-pointer',
							].join(' ')}
						></i>
						{renderPageButtons()}
						<i
							onClick={() => {
								if (currentPage < totalPages) {
									onChangePage(currentPage + 1);
								}
							}}
							className={[
								'fa-solid transition-colors fa-arrow-right ml-5',
								currentPage === totalPages ? 'text-gray-400' : 'cursor-pointer',
							].join(' ')}
						></i>
					</div>
				</div>
			)}
		</div>
	);
};

export default CompaniesList;
