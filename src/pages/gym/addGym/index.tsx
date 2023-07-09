import { useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';

import Dropzone, { DropzoneElement } from '../../../base-components/Dropzone';
import { ClassicEditor } from '../../../base-components/Ckeditor';
import TomSelect from '../../../base-components/TomSelect';
import Button from '../../../base-components/Button';
import { FormInput, FormLabel } from '../../../base-components/Form';
import { FA_IR, FA_IR_ERROR } from '../../../language';
import { Field, Form, Formik } from 'formik';
import { IAddGymForm } from '../../../interfaces';
import { CustomErrorMessage } from '../../../components/Form/Error';
import { useCreateGym, useGetCityList, useGetProvinceList } from '../../../hooks';
import { toast } from 'react-toastify';
import { useNavigatableMap } from '../../../hooks/useNavigatableMap';
import { NavigatableMap } from '../../../components/NavigatableMap';

const initialValues: IAddGymForm = {
	name: '',
	address: '',
};

const validationSchema = Yup.object({
	name: Yup.string().required(FA_IR_ERROR.GymNameRequired),
	address: Yup.string().required(FA_IR_ERROR.GymAddress),
});

const ValidateSchemaCompleteData = Yup.object({
	name: Yup.string().required(FA_IR_ERROR.GymNameRequired),
	city_id: Yup.string().required(FA_IR_ERROR.CityRequired),
	description: Yup.string().required(FA_IR_ERROR.GymDescriptionRequired),
	contacts: Yup.string().required(FA_IR_ERROR.GymContactsRequired),
	latitude: Yup.string().required(FA_IR_ERROR.GymLocationRequired),
	longitude: Yup.string().required(FA_IR_ERROR.GymLocationRequired),
	address: Yup.string().required(FA_IR_ERROR.GymAddress),
});


const descEditorConfig = {
	toolbar: {
		items: [
			'bold',
			'italic',
			'link',
			'undo',
			'redo',
			'blockQuote',
			'numberedList',
			'bulletedList',
		],

		direction: 'rtl',
	},
	id: 'gdesc',
	language: 'fa',
	placeholder: FA_IR.EnterGymDescription,
};
 
const contactEditorConfig = {
	toolbar: {
		items: [
			'bold',
			'italic',
			'link',
			'undo',
			'redo',
			'blockQuote',
			'numberedList',
			'bulletedList',
		],

		direction: 'rtl',
	},
	id: 'gcontacts',
	language: 'fa',
	placeholder: FA_IR.EnterGymContacts,
};

// *["undo", "redo", "bold", "italic", "blockQuote", "ckfinder", "imageTextAlternative", "imageUpload", "heading", "imageStyle:full", "imageStyle:side", "link", "numberedList", "bulletedList", "mediaEmbed", "insertTable", "tableColumn", "tableRow", "mergeTableCells"]*
function Main() {
	const [selectedProvince, setSelectedProvince] = useState<string>('#');
	const { data: provinces } = useGetProvinceList();
	const { data: cities } = useGetCityList(selectedProvince);
	const [selectedCity, setSelectedCity] = useState<string>('');
	const [descEditorData, setDescEditorData] = useState<string>('');
	const [contactEditorData, setContactEditorData] = useState<string>('');
	const [backgroundImage, setBackgroundImage] = useState<any>(null);
	const [logo, setLogo] = useState<any>(null);
	const [license, setLicense] = useState<any>(null);
	const backgroundImageRef = useRef<DropzoneElement>();
	const logoRef = useRef<DropzoneElement>();
	const licenseRef = useRef<DropzoneElement>();
	useEffect(() => {
		 const backImgEl = backgroundImageRef.current;
		 const logoEl = logoRef.current;
			if (backImgEl) {
				backImgEl.dropzone.on('success', () => {
					setBackgroundImage(backImgEl.dropzone.files[0]);
				});
				backImgEl.dropzone.on('error', () => {
					toast.error(FA_IR_ERROR.UploadFailed);
				});
		}
		if (logoEl) {
			logoEl.dropzone.on('success', () => {
				setLogo(logoEl.dropzone.files[0]);
			});
			logoEl.dropzone.on('error', () => {
				toast.error(FA_IR_ERROR.UploadFailed);
			});
		}
	}, [])
	const {
		currentLocation,
		geolocationStatus,
		handleResetLocation,
		setCurrentLocation,
	} = useNavigatableMap();
	const { mutate: createGym} = useCreateGym();
	const handleSubmit = async (values: typeof initialValues) => {
		try {
			const data = {
				name: values.name,
				city_id: selectedCity,
				description: descEditorData,
				contacts: contactEditorData,
				latitude: currentLocation?.lat.toFixed(3),
				longitude: currentLocation?.lng.toFixed(3),
				address: values.address,
			};
			await ValidateSchemaCompleteData.validate(data);
			if (!backgroundImage || !logo) {
				throw new Error(FA_IR_ERROR.GymImagesRequired);
			}
			const formData = new FormData();
			Object.entries(data).forEach(([key, value]) => {
				formData.append(key, value as string);
			});
			formData.append('background_image', backgroundImage);
			formData.append('logo_image', logo);
			formData.append('licnese_image', license);
			createGym(formData)
			
		} catch (e: any) {
			toast.error(e.message);
		}
	};

	return (
		<>
			<div className="flex rtl items-center mt-8 intro-y">
				<h2 className="ml-auto text-lg font-medium">{FA_IR.AddGym}</h2>
			</div>

			<div className="mt-5 lg:max-w-3xl mx-auto intro-y">
				{/* BEGIN: Form Layout */}
				<Formik
					onSubmit={handleSubmit}
					initialValues={initialValues}
					validationSchema={validationSchema}
					validateOnBlur
					validateOnChange={false}
					validateOnMount={false}
				>
					<Form className="p-5 intro-y box rtl">
						<div className="mt-3 intro-x">
							<FormLabel htmlFor="gname">{FA_IR.GymName}</FormLabel>
							<Field
								as={FormInput}
								id="gname"
								type="text"
								name="name"
								className="block"
								placeholder={FA_IR.GymName}
							/>
							<CustomErrorMessage name="name" />
						</div>
						<div className="mt-3 intro-x">
							<FormLabel htmlFor="gdesc">{FA_IR.GymDescription}</FormLabel>

							<ClassicEditor
								key="descEditor"
								value={descEditorData}
								onChange={setDescEditorData}
								config={descEditorConfig}
							/>
						</div>
						<div className="mt-3 intro-x">
							<FormLabel htmlFor="gcontacts">{FA_IR.GymContacts}</FormLabel>
							<ClassicEditor
								key="contactEditor"
								value={contactEditorData}
								onChange={setContactEditorData}
								config={contactEditorConfig}
							/>
						</div>
						<section className="mt-4 gap-3 grid grid-cols-2">
							<div className="col-span-1 intro-x">
								<FormLabel htmlFor="province">{FA_IR.UploadGymImage}</FormLabel>
								<Dropzone
									getRef={(el) => {
										backgroundImageRef.current = el;
									}}
									options={{
										url: 'https://httpbin.org/post',
										thumbnailWidth: 150,
										maxFilesize: 0.5,
										maxFiles: 1,
										headers: { 'My-Awesome-Header': 'header value' },
									}}
									className="dropzone"
								>
									<div className="text-lg font-medium text-opacity-30">
										{FA_IR.DragImageHereOrClickToUpload}
									</div>
								</Dropzone>
							</div>
							<div className="col-span-1 intro-x">
								<FormLabel htmlFor="province">{FA_IR.UploadGymLogo}</FormLabel>
								<Dropzone
									getRef={(el) => {
										logoRef.current = el;
									}}
									options={{
										url: 'https://httpbin.org/post',
										thumbnailWidth: 150,
										maxFilesize: 0.5,
										maxFiles: 1,
										headers: { 'My-Awesome-Header': 'header value' },
									}}
									className="dropzone"
								>
									<div className="text-lg font-medium text-opacity-30">
										{FA_IR.DragImageHereOrClickToUpload}
									</div>
								</Dropzone>
							</div>
						</section>
						<div className="intro-x mt-3">
							<FormLabel htmlFor="province">{FA_IR.UploadLicenseImage}</FormLabel>
							<Dropzone
								getRef={(el) => {
									licenseRef.current = el;
								}}
								options={{
									url: 'https://httpbin.org/post',
									thumbnailWidth: 150,
									maxFilesize: 0.5,
									maxFiles: 1,
									headers: { 'My-Awesome-Header': 'header value' },
								}}
								className="dropzone"
							>
								<div className="text-lg font-medium text-opacity-30">
									{FA_IR.DragImageHereOrClickToUpload}
								</div>
							</Dropzone>
						</div>
						<div className="mt-3 intro-x">
							<FormLabel htmlFor="province">{FA_IR.Province}</FormLabel>
							<TomSelect
								id="province"
								value={selectedProvince}
								onChange={setSelectedProvince}
								className="w-full ltr"
							>
								<option selected value="#" disabled>
									{FA_IR.SelectProvince}
								</option>
								{provinces?.map((province) => (
									<option key={`province-${province.id}`} value={province.id}>
										{province.name}
									</option>
								))}
							</TomSelect>
						</div>
						<div className="mt-3 intro-x">
							<FormLabel htmlFor="city">{FA_IR.City}</FormLabel>
							<TomSelect
								id="city"
								value={selectedCity}
								onChange={setSelectedCity}
								className="w-full ltr"
							>
								{cities?.city?.map((city) => (
									<option key={`city-${city.id}`} value={city.id}>
										{city.name}
									</option>
								))}
							</TomSelect>
						</div>
						<div className="mt-3 intro-x">
							<FormLabel htmlFor="faddress">{FA_IR.FullAddress}</FormLabel>
							<Field
								as={FormInput}
								id="faddress"
								type="text"
								name="address"
								className="block"
								placeholder={FA_IR.EnterFullAddress}
							/>

							<CustomErrorMessage name="address" />
						</div>
						<div className="mt-3 intro-x">
							<FormLabel htmlFor="glocation">{FA_IR.GymLocation}</FormLabel>
							<NavigatableMap
								className="h-80"
								currentLocation={currentLocation}
								geolocationStatus={geolocationStatus}
								handleResetLocation={handleResetLocation}
								setCurrentLocation={setCurrentLocation}
							/>
						</div>

						<div className="mt-5 text-center">
							<Button
								type="submit"
								variant="primary"
								className="w-full lg:w-90"
							>
								{FA_IR.AddGym}
							</Button>
						</div>
					</Form>
				</Formik>

				{/* END: Form Layout */}
			</div>
		</>
	);
}

export default Main;
