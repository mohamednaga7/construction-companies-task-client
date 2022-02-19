import React, { useCallback, useEffect, useState } from 'react';
import { getSpecialtiesList } from '../../models/Specialty.enum';
import { debounce } from 'lodash';

interface ICompaniesFilterProps {
	nameChanged: (name: string) => void;
	specialtiesChanged: (specialties: string[]) => void;
}

const CompaniesFilter: React.FC<ICompaniesFilterProps> = ({
	nameChanged,
	specialtiesChanged,
}) => {
	const [specialties, setSpecialties] = useState(
		getSpecialtiesList().map((specialty) => ({
			value: specialty,
			selected: false,
		}))
	);
	const [nameText, setNameText] = useState('');

	useEffect(() => {
		specialtiesChanged(
			specialties.filter((spec) => spec.selected).map((spec) => spec.value)
		);
	}, [specialties, specialtiesChanged]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debounceLoadData = useCallback(
		debounce((value) => {
			nameChanged(value);
		}, 500),
		[nameChanged]
	);

	const toggleSpecialty = (specialty: string) => {
		setSpecialties(
			specialties.map((item) => {
				if (item.value === specialty) {
					return { ...item, selected: !item.selected };
				}
				return item;
			})
		);
	};

	const handleNameFilterChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setNameText(value);
		debounceLoadData(value);
	};

	return (
		<div className='flex-grow-[1] p-4 border-r-2'>
			<div className='bg-transparent flex justify-between items-center mb-4 rounded-sm border-b'>
				<input
					type='text'
					placeholder='Company Name'
					value={nameText}
					className='px-3 py-1 mt-2 rounded-sm bg-transparent outline-none'
					onChange={handleNameFilterChanged}
				/>
				<i className='fa-solid fa-magnifying-glass mr-2'></i>
			</div>
			<div className='border pt-4'>
				<h3 className=' text-xl border-b-2 pb-3 pl-2 text-gray-700'>
					Company Specialty
				</h3>
				<div>
					{specialties.map((specialty) => (
						<div key={specialty.value} className='px-5 py-3'>
							<div
								onClick={() => {
									toggleSpecialty(specialty.value);
								}}
							>
								<input
									type='checkbox'
									checked={specialty.selected}
									onChange={() => {}}
								/>
								<label className='ml-2'>{specialty.value}</label>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CompaniesFilter;
