"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpecialtiesList = exports.Specialty = void 0;
var Specialty;
(function (Specialty) {
    Specialty["Excavation"] = "Excavation";
    Specialty["Construction"] = "Construction";
    Specialty["Plumbing"] = "Plumbing";
    Specialty["Electrical"] = "Electrical";
    Specialty["HVAC"] = "HVAC";
    Specialty["Welding"] = "Welding";
    Specialty["Painting"] = "Painting";
    Specialty["Masonry"] = "Masonry";
    Specialty["Landscaping"] = "Landscaping";
    Specialty["Roofing"] = "Roofing";
    Specialty["Concrete"] = "Concrete";
    Specialty["Carpentry"] = "Carpentry";
    Specialty["General"] = "General";
})(Specialty = exports.Specialty || (exports.Specialty = {}));
function getSpecialtiesList() {
    const specialties = [];
    for (const specialty in Specialty) {
        specialties.push(specialty);
    }
    return specialties;
}
exports.getSpecialtiesList = getSpecialtiesList;
