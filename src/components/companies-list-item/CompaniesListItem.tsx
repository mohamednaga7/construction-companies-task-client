import React from 'react';
import { ICompany } from '../../models/Company.model';

interface ICompaniesListItemProps {
	company: ICompany;
	index: number;
}

const CompaniesListItem: React.FC<ICompaniesListItemProps> = ({
	company: { companyName, city, logo, specialty },
	index,
}) => {
	return (
		<div
			className={[
				'flex border-b-2',
				index % 2 === 0 ? 'bg-gray-100' : 'bg-white',
			].join(' ')}
		>
			<div className='w-[150px] basis-[150px]'>
				<img className='w-full object-cover' src={logo} alt={companyName} />
			</div>
			<div className='pl-5 pt-3'>
				<h4 className='uppercase text-lg font-semibold mb-4 cursor-pointer hover:text-gray-500 transition-colors'>
					{companyName}
				</h4>
				<p className='text-gray-500'>Specialized in {specialty}</p>
				<p className='text-gray-400'>located in {city}</p>
			</div>
		</div>
	);
};

export default CompaniesListItem;
