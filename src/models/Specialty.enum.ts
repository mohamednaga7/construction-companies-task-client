export enum Specialty {
	Excavation = 'Excavation',
	Construction = 'Construction',
	Plumbing = 'Plumbing',
	Electrical = 'Electrical',
	HVAC = 'HVAC',
	Welding = 'Welding',
	Painting = 'Painting',
	Masonry = 'Masonry',
	Landscaping = 'Landscaping',
	Roofing = 'Roofing',
	Concrete = 'Concrete',
	Carpentry = 'Carpentry',
	General = 'General',
}

export function getSpecialtiesList() {
	const specialties = [];

	for (const specialty in Specialty) {
		specialties.push(specialty);
	}

	return specialties;
}
