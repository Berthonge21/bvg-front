import * as Yup from 'yup';

export const staffValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Le prénom est requis')
    .min(2, 'Le prénom doit contenir au moins 2 caractères'),

  lastName: Yup.string()
    .required('Le nom de famille est requis')
    .min(2, 'Le nom de famille doit contenir au moins 2 caractères'),

  email: Yup.string().email('Email invalide').required("L'email est requis"),

  phone1: Yup.string()
    .required('Le numéro de téléphone est requis')
    .matches(/^[0-9]+$/, 'Le numéro de téléphone doit être numérique'),
  phone2: Yup.string().matches(
    /^[0-9]*$/,
    'Le numéro de téléphone doit être numérique',
  ),
  address: Yup.string()
    .required("L'adresse est requise")
    .min(5, "L'adresse doit contenir au moins 5 caractères"),

  cinType: Yup.string().required('Le type de CIN est requis'),
  cinNumber: Yup.string().when('cinType', {
    is: 'CIN',
    then: schema =>
      schema
        .matches(/^[0-9]{8}$/, 'Le CIN doit contenir 8 chiffres')
        .required('Le numéro CIN est requis'),
    otherwise: schema =>
      schema
        .matches(
          /^[A-Z0-9]{9}$/,
          'Le passeport doit contenir 9 caractères alphanumériques',
        )
        .required('Le numéro de passeport est requis'),
  }),

  salary: Yup.number()
    .typeError('Le salaire doit être un nombre')
    .required('Le salaire est requis')
    .positive('Le salaire doit être positif'),

  sex: Yup.string().required('Le sexe est requis'),

  staffPost: Yup.string().required('La fonction est requise'),

  startDate: Yup.date()
    .required('La date de début est requise')
    .typeError('Veuillez entrer une date valide'),

  endDate: Yup.date()
    .nullable()
    .min(
      Yup.ref('startDate'),
      'La date de fin doit être ultérieure à la date de début',
    ),

  contractDuration: Yup.number()
    .typeError('La durée du contrat doit être un nombre')
    .positive('La durée doit être positive')
    .required('La durée du contrat est requise'),

  contractPeriodicity: Yup.string().required('La périodicité est requise'),

  contractType: Yup.string().required('Le type de contrat est requis'),

  features: Yup.array()
    .min(1, 'Veuillez sélectionner au moins une permission')
    .required('Les permissions sont requises'),
});
