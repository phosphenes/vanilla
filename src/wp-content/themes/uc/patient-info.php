
	<section id="patientInfoForm">
		<main>

<!--			<form id="registration" method="post" action="https://www.smileolympia.com//">-->
<!--				<div class="hiddenFields">-->
<!--					<input type="hidden" name="ACT" value="17">-->
<!--					<input type="hidden" name="URI" value="contact-us/patient-form">-->
<!--					<input type="hidden" name="XID" value="0f6d0a38c79a292b6c267d4e4e0db96fbed17152">-->
<!--					<input type="hidden" name="status" value="open">-->
<!--					<input type="hidden" name="return" value="https://www.smileolympia.com/contact-us/registration-confirmation">-->
<!--					<input type="hidden" name="redirect_on_duplicate" value="">-->
<!--					<input type="hidden" name="RET" value="https://www.smileolympia.com/https://www.smileolympia.com/contact-us/patient-form">-->
<!--					<input type="hidden" name="form_name" value="New patient registration">-->
<!--					<input type="hidden" name="ajax_request" value="y">-->
<!--					<input type="hidden" name="params_id" value="15223">-->
<!--					<input type="hidden" name="site_id" value="1">-->
<!--				</div>-->
			<form id="registration" method="post" action="/wp-content/themes/uc/process.php">
				<input type="hidden" name="pType" value="registration">

				<div class="columns col-2 sizes-50-50">

					<fieldset>
						<input type="hidden" name="MARKER_patient_info">
						<h4>Patient Information</h4>
						<div class="formRow">
							<label for="lastname">Last Name:</label>
							<input type="text" name="last_name" id="lastname" value="" required>
							<span class="required">*required</span>
						</div>
						<div class="formRow">
							<label for="firstname">First Name:</label>
							<input type="text" name="first_name" id="firstname" value="" required>
							<span class="required">*required</span>
						</div>
						<div class="formRow">
							<label for="mi">Middle Initial:</label>
							<input type="text" name="middle_initial" id="mi" value="" size="1">
						</div>

						<div class="formRow">
							<label for="email">Email Address:</label>
							<input type="text" name="email" id="email" value="" required>
							<span class="required">*required</span>
						</div>

						<div class="formRow">
							<label for="workphone">Work Phone:</label>
							<input type="text" name="work_phone" id="workphone" value="">
						</div>

						<div class="formRow">
							<label for="homephone">Home Phone:</label>
							<input type="text" name="home_phone" id="homephone" value="">
						</div>

						<div class="formRow">
							<label for="cellphone">Cell Phone:</label>
							<input type="text" name="cell_phone" id="cellphone" value="">
						</div>

						<div class="formRow">
							<label for="birthdate">Birth date:</label>
							<input type="text" name="birthdate" id="birthdate" value="">
							<small>MM/DD/YYYY</small>
						</div>

						<div class="formRow">
							<label for="soc1">Social Security:</label>
							<input type="text" name="social_security" id="soc1" value="">
						</div>

						<div class="formRow">
							<label>Sex:</label>
							<div class="radiogroup">
								<input type="radio" name="sex" id="male" value="male"> <label for="male" class="labelradio">M</label>
								<input type="radio" name="sex" id="female" value="female"> <label for="female" class="labelradio">F</label>
							</div>
						</div>
					</fieldset>

					<fieldset>
						<input type="hidden" name="MARKER_mailing_address">
						<h4>Mailing address</h4>

						<div class="formRow">
							<label for="street">Street:</label>
							<input type="text" name="street" id="street" value="">
						</div>

						<div class="formRow">
							<label for="city">City:</label>
							<input type="text" name="city" id="city" value="">
						</div>
						<div class="formRow">
							<label for="state">State:</label>
							<input type="text" name="state" id="state" value="">
						</div>
						<div class="formRow">
							<label for="zip">Zip:</label>
							<input type="text" name="zip" id="zip" value="" size="5">
						</div>

						<div class="formRow">
							<label for="employer">Employer:</label>
							<input type="text" name="employer" id="employer" value="">
						</div>
						<div class="formRow">
							<label for="referredby">Referred By:</label>
							<input type="text" name="referred_by" id="referredby" value="">
						</div>
						<div class="formRow">
							<label for="spousename">Spouse/Partner's Name:</label>
							<input type="text" name="spouse_name" id="spousename" value="">
						</div>
						<div class="formRow">
							<label for="spouseemployer">Spouse/Partner's Employer:</label>
							<input type="text" name="spouse_employer" id="spouseemployer" value="">
						</div>
						<div class="formRow">
							<label for="reasonappt">Reason for Appointment:</label>
							<input type="text" name="reason_for_appointment" id="reasonappt" value="">
						</div>
					</fieldset>

					<fieldset>
						<input type="hidden" name="MARKER_if_patient_is_a_minor">
						<h4>If patient is a minor (under 18)</h4>
						<div class="formRow">
							<label for="fathername">Name of Father/Guardian:</label>
							<input type="text" name="father_name" id="fathername" value="">
						</div>
						<div class="formRow">
							<label for="fatherworkphone">Work Phone:</label>
							<input type="text" name="father_work_phone" id="fatherworkphone" value="">
						</div>
						<div class="formRow">
							<label for="fatheremployer">Employer:</label>
							<input type="text" name="father_employer" id="fatheremployer" value="">
						</div>
						<div class="formRow">
							<label for="mothername">Name of Mother/Guardian:</label>
							<input type="text" name="mother_name" id="mothername" value="">
						</div>
						<div class="formRow">
							<label for="motherworkphone">Work Phone:</label>
							<input type="text" name="mother_work_phone" id="motherworkphone" value="">
						</div>
						<div class="formRow">
							<label for="motheremployer">Employer:</label>
							<input type="text" name="mother_employer" id="motheremployer" value="">
						</div>
					</fieldset>

					<fieldset>
						<input type="hidden" name="MARKER_dental_insurance">
						<h4>Dental insurance</h4>
						<p>By signing this form, you authorize Dr. Walker to bill your dental insurance company for treatment rendered.</p>

						<div class="formRow">
							<label for="dentalinsurance">Insurance Company:</label>
							<input type="text" name="dental_insurance" id="dentalinsurance" value="">
						</div>
						<div class="formRow">
							<label for="dentaladdress">Company Address, City, State, Zip:</label>
							<input type="text" name="dental_address" id="dentaladdress" value="">
						</div>
						<div class="formRow">
							<label for="dentalsubscriber">Subscriber's Name:</label>
							<input type="text" name="dental_subscriber" id="dentalsubscriber" value="">
						</div>
						<div class="formRow">
							<label for="dentalssn">Subscriber's SS# or ID#:</label>
							<input type="text" name="dental_ssn" id="dentalssn" value="">
						</div>
						<div class="formRow">
							<label for="dentalbirthdate">Subscriber's birthdate:</label>
							<input type="text" name="dental_birthdate" id="dentalbirthdate" value="">
							<small>MM/DD/YYYY</small>
						</div>
						<div class="formRow">
							<label for="dentalgroupno">Group #:</label>
							<input type="text" name="dental_group_number" id="dentalgroupno" value="">
						</div>
						<div class="formRow">
							<label>Patient's Relationship to Subscriber:</label>
							<div class="radiogroup">
								<input type="radio" name="dental_relationship" id="dental_relationship_self" value="self" checked="checked"><label for="dentalrelationship_self" class="labelradio">Self</label><br>
								<input type="radio" name="dental_relationship" id="dental_relationship_spouse" value="spousepartner"><label for="dentalrelationship_spouse" class="labelradio">Spouse/Partner</label><br>
								<input type="radio" name="dental_relationship" id="dental_relationship_child" value="child"><label for="dentalrelationship_child" class="labelradio">Child</label><br>
								<input type="radio" name="dental_relationship" id="dental_relationship_other" value="other"><label for="dentalrelationship_other" class="labelradio">Other:</label><input type="text" name="dental_relationship_other_value" value="">
							</div>
						</div>
					</fieldset>

					<fieldset>
						<input type="hidden" name="MARKER_additional_dental_insurance">
						<h4>Additional dental insurance</h4>
						<div class="formRow">
							<label for="addtlinsurance">Insurance Company:</label>
							<input type="text" name="additional_company" id="addtlinsurance" value="">
						</div>
						<div class="formRow">
							<label for="addtladdress">Company Address, City, State, Zip:</label>
							<input type="text" name="additional_address" id="addtladdress" value="">
						</div>
						<div class="formRow">
							<label for="addtlsubscriber">Subscriber's Name:</label>
							<input type="text" name="additional_subscriber" id="addtlsubscriber" value="">
						</div>
						<div class="formRow">
							<label for="addtlssn">Subscriber's SS# or ID#:</label>
							<input type="text" name="additional_ssn" id="addtlssn" value="">
						</div>
						<div class="formRow">
							<label for="addtlbirthdate">Subscriber's birthdate:</label>
							<input type="text" name="additional_birthdate" id="addtlbirthdate" value="">
							<small>MM/DD/YYYY</small>
						</div>
						<div class="formRow">
							<label for="addtlgroupno">Group #:</label>
							<input type="text" name="additional_group_number" id="addtlgroupno" value="">
						</div>
						<div class="formRow">
							<label>Patient's Relationship to Subscriber:</label>
							<div class="radiogroup">
								<input type="radio" name="additional_relationship" id="additional_relationship_self" checked="checked" value="self"><label for="addtlrelationship_self" class="labelradio">Self</label><br>
								<input type="radio" name="additional_relationship" id="additional_relationship_spouse" value="spousepartner"><label for="addtlrelationship_spouse" class="labelradio">Spouse/Partner</label><br>
								<input type="radio" name="additional_relationship" id="additional_relationship_child" value="child"><label for="addtlrelationship_child" class="labelradio">Child</label><br>
								<input type="radio" name="additional_relationship" id="additional_relationship_other" value="other"><label for="addtlrelationship_other" class="labelradio">Other:</label><input type="text" name="additional_relationship_other_value" value="">
							</div>
						</div>
					</fieldset>

					<fieldset>
						<input type="hidden" name="MARKER_emergency_medical_contact">
						<h4>Emergency Medical Contact</h4>
						<div class="formRow">
							<label for="emergencycontact">Name:</label>
							<input type="text" name="emergency_contact" id="emergencycontact" value="">
						</div>
						<div class="formRow">
							<label for="emergencyphone">Phone:</label>
							<input type="text" name="emergency_phone" id="emergencyphone" value="">
						</div>
						<div class="formRow">
							<label for="emergencydrname">Name of Medical Doctor:</label>
							<input type="text" name="emergency_dr_name" id="emergencydrname" value="">
						</div>
						<div class="formRow">
							<label for="emergencydrphone">Doctor's Phone:</label>
							<input type="text" name="emergency_dr_phone" id="emergencydrphone" value="">
						</div>
					</fieldset>

					<fieldset class="checkboxes">
						<input type="hidden" name="MARKER_medical_conditions">
						<h4>Medical conditions</h4>
						<a name="medicalconditions"></a>
						<p>Do you have or have you had any of the following. Check all that apply:</p>

						<div class="formRow">

							<p><input type="checkbox" name="allergic_drugs" id="allergicdrugs" value="true"><label for="allergicdrugs">Allergies to drugs, please specify:</label><input type="text" name="allergic_drugs_info" value=""></p>

							<p><input type="checkbox" name="allergic_latex" id="allergiclatex" value="true"><label for="allergiclatex">Allergies to latex</label></p>

							<p><input type="checkbox" name="artificial_heart_valves" id="artificialheartvalves" value="true"><label for="artificialheartvalves">Artificial heart valve</label></p>

							<p><input type="checkbox" name="artificial_joints" id="artificialjoints" value="true"><label for="artificialjoints">Artificial joints, please indicate date of surgery:</label><input type="text" name="artificial_joints_info" value=""></p>

							<p><input type="checkbox" name="heart_ailments" id="heartailments" value="true"><label for="heartailments">Any heart ailments, please specify:</label><input type="text" name="heart_ailments_info" value=""></p>

							<p><input type="checkbox" name="rheumatic_fever" id="rheumaticfever" value="true"><label for="rheumaticfever">Rheumatic fever</label></p>

							<p><input type="checkbox" name="high_blood_pressure" id="highbloodpressure" value="true"><label for="highbloodpressure">High blood pressure</label></p>

							<p><input type="checkbox" name="heart_murmur" id="heartmurmur" value="true"><label for="heartmurmur">Heart murmur</label></p>

							<p><input type="checkbox" name="neurological_problems" id="neurologicalproblems" value="true"><label for="neurologicalproblems">Neurological problems</label></p>

							<p><input type="checkbox" name="radiation_treatments" id="radiationtreatments" value="true"><label for="radiationtreatments">Radiation treatments</label></p>

							<p><input type="checkbox" name="excessive_bleeding" id="excessivebleeding" value="true"><label for="excessivebleeding">Excessive bleeding from cut or extractions</label></p>

							<p><input type="checkbox" name="anemia" id="anemia" value="true"><label for="anemia">Anemia or blood problems</label></p>

							<p><input type="checkbox" name="arthritis" id="arthritis" value="true"><label for="arthritis">Arthritis</label></p>

							<p><input type="checkbox" name="asthma" id="asthma" value="true"><label for="asthma">Asthma</label></p>

							<p><input type="checkbox" name="diabetes" id="diabetes" value="true"><label for="diabetes">Diabetes</label></p>

							<p><input type="checkbox" name="kidney_problems" id="kidneyproblems" value="true"><label for="kidneyproblems">Kidney problems</label></p>

							<p><input type="checkbox" name="liver_problems" id="liverproblems" value="true"><label for="liverproblems">Liver problems or hepatitis</label></p>

							<p><input type="checkbox" name="malignancies" id="malignancies" value="true"><label for="malignancies">Malignancies</label></p>

							<p><input type="checkbox" name="psychiatric_care" id="psychiatriccare" value="true"><label for="psychiatriccare">Psychiatric care/emotional problems</label></p>

							<p><input type="checkbox" name="sinus" id="sinus" value="true"><label for="sinus">Sinus problems</label></p>

							<p><input type="checkbox" name="epilepsy" id="epilepsy" value="true"><label for="epilepsy">Epilepsy</label></p>

							<p><input type="checkbox" name="stroke" id="stroke" value="true"><label for="stroke">Stroke</label></p>

							<p><input type="checkbox" name="thyroid" id="thyroid" value="true"><label for="thyroid">Thyroid</label></p>

							<p><input type="checkbox" name="tuberculosis" id="tuberculosis" value="true"><label for="tuberculosis">Tuberculosis</label></p>

							<p><input type="checkbox" name="pregnant" id="pregnant" value="true"><label for="pregnant">For women, are you pregnant? If so, when due:</label><input type="text" name="pregnant_info" value=""></p>

							<p><input type="checkbox" name="oral_contraceptives" id="oralcontraceptives" value="true"><label for="oralcontraceptives">Are you currently taking oral contraceptives? Please specify:</label><input type="text" name="oral_contraceptives_info" value=""></p>

							<p><input type="checkbox" name="hiv_positive" id="hivpositive" value="true"><label for="hivpositive">AIDS/ARC/HIV Positive</label></p>

							<p><input type="checkbox" name="herpes" id="herpes" value="true"><label for="herpes">Herpes</label></p>

							<p><input type="checkbox" name="chemotherapy" id="chemotherapy" value="true"><label for="chemotherapy">Chemotherapy</label></p>

							<p><input type="checkbox" name="osteoporosis" id="osteoporosis" value="true"><label for="osteoporosis">Osteoporosis</label></p>

							<p><input type="checkbox" name="history_premedication" id="historypremedication" value="true"><label for="historypremedication">History of Premedication for Dental Treatment</label></p>

						</div>
						<div class="formRow">
							<label class="text-label">
								<span>Please describe or list any current medical treatment, medications, past operations, or impending operations that Dr. Walker should be aware of:</span>
								<textarea rows="2" cols="40" name="comments"></textarea>
							</label>
						</div>

					</fieldset>

					<fieldset class="checkboxes">
						<input type="hidden" name="MARKER_dental_conditions">
						<h4>Dental conditions</h4>
						<a name="dentalconditions"></a>
						<p>Do you have or do you use any of the following. Check all that apply:</p>
						<div class="formRow">
							<p><input type="checkbox" name="teeth_sensitive" id="teethsensitive" value="true"><label for="teethsensitive">Teeth sensitive to cold, heat, sweets or pressure</label></p>

							<p><input type="checkbox" name="bleeding_gums" id="bleedinggums" value="true"><label for="bleedinggums">Bleeding gums. How long?</label><input type="text" name="bleeding_gums_info" value=""></p>

							<p><input type="checkbox" name="food_impaction" id="foodimpaction" value="true"><label for="foodimpaction">Food impaction</label></p>

							<p><input type="checkbox" name="clenching" id="clenching" value="true"><label for="clenching">Clenching or grinding</label></p>

							<p><input type="checkbox" name="swelling" id="swelling" value="true"><label for="swelling">Swelling or lumps in mouth</label></p>

							<p><input type="checkbox" name="frequent_blisters" id="frequentblisters" value="true"><label for="frequentblisters">Frequent blisters on lips or mouth</label></p>

							<p><input type="checkbox" name="bad_breath" id="badbreath" value="true"><label for="badbreath">Bad breath</label></p>

							<p><input type="checkbox" name="unpleasant_taste" id="unpleasanttaste" value="true"><label for="unpleasanttaste">Unpleasant taste</label></p>

							<p><input type="checkbox" name="fear" id="fear" value="true"><label for="fear">Fear of dental treatment, please specify:</label><input type="text" name="fear_info" value=""></p>

							<p><input type="checkbox" name="unfavorable" id="unfavorable" value="true"><label for="unfavorable">Unfavorable dental experience, please specify:</label><input type="text" name="unfavorable_info" value=""></p>

							<p><input type="checkbox" name="complications" id="complications" value="true"><label for="complications">Complications from extractions</label></p>

							<p><input type="checkbox" name="periodontal" id="periodontal" value="true"><label for="periodontal">Periodontal treatment, please specify:</label><input type="text" name="periodontal_info" value=""></p>

							<p><input type="checkbox" name="orthodontic" id="orthodontic" value="true"><label for="orthodontic">Orthodontic treatment, please specify:</label><input type="text" name="orthodontic_info" value=""></p>

							<p><input type="checkbox" name="tobacco" id="tobacco" value="true"><label for="tobacco">Tobacco use</label></p>

							<p><input type="checkbox" name="toothbrush" id="toothbrush" value="true"><label for="toothbrush">Texture of toothbrush, please specify:</label><input type="text" name="toothbrush_info" value=""></p>

							<p><input type="checkbox" name="frequency" id="frequency" value="true"><label for="frequency">Frequency of brushing, please specify:</label><input type="text" name="frequency_info" value=""></p>

							<p><input type="checkbox" name="floss" id="floss" value="true"><label for="floss">Dental floss</label></p>

							<p><input type="checkbox" name="stimulators" id="stimulators" value="true"><label for="stimulators">Interdental stimulators</label></p>

							<p><input type="checkbox" name="fluoride" id="fluoride" value="true"><label for="fluoride">Fluoride supplements</label></p>

							<p><input type="checkbox" name="last_exam" id="lastexam" value="true"><label for="lastexam">Date of last dental exam:</label><input type="text" name="last_exam_info" value=""></p>

							<p><input type="checkbox" name="whiten_teeth" id="whitenteeth" value="true"><label for="whitenteeth">Would you like to whiten your teeth?</label></p>

							<p><input type="checkbox" name="change_teeth" id="changeteeth" value="true"><label for="changeteeth">Is there anything else you would like to change about the appearance of your teeth? Please specify: </label> <input type="text" name="change_teeth_info" value=""></p>
							<p><input type="checkbox" name="special_attention" id="specialattention" value="true"><label for="specialattention">Is there anything you would like us to pay special attention to? Please specify: </label><input type="text" name="special_attention_info" value=""></p>
						</div>
					</fieldset>
					
				</div>
				<hr>
				<fieldset style="text-align: center">
					<!--						<div class="formRow screen-reader">-->
					<!--							<label for="honeepot">Don't put anything here</label>-->
					<!--							<input type="text" name="honeepot" id="honeepot">-->
					<!--						</div>-->
					<div class="formRow">
						<input type="submit" name="submit" value="Submit">
						<p id="invalidForm">First name, last name and email are all required fields. You can submit the form once they're all filled out.</p>
					</div>
				</fieldset>

			</form>


		</main>
	</section>

	<script>
		;(function(window){
			var requiredFields
			
			π.mods.push(init)
			function init() {
				// ditch 'required' spans and add required class to the label
				π('span.required').forEach(function (span) {
					span.siblings('label')[0].addClass('required')
					span.kill()
				})
				
				π('fieldset h4').forEach(function (h4) {
					h4.textContent = h4.textContent.capitalCase()
				})

				// put inputs inside labels alongside spans
				var form = πd('registration')
				form.π('input[type=text], input[type=email]').forEach(function (textInput) {
					var parent = textInput.parentNode
					if (parent.hasClass('radiogroup')) {
						textInput.addClass('radio-text')
					}
					
					else if (checkbox = parent.π1('input[type=checkbox]')) {
						var label = textInput.siblings('label')[0]
						label.addClass('checkbox-label')
						fixDom(label, textInput, checkbox)
					}
					
					else {
						var label = textInput.siblings('label')[0]
						label.addClass('text-label')
						fixDom(label, textInput)
					}
				})
				
				form.π('.radiogroup input[type=radio]').forEach(function (radio) {
					var label = radio.nextSibling
					while (label.nodeName != "LABEL") {
						label = label.nextSibling
					}
					
					fixDom(label, null, radio)
				})
				
				form.π('p input[type=checkbox]').forEach(function (checkbox) {
					if (label = checkbox.siblings('label')[0]) {
						label.addClass('checkbox-label')
						fixDom(label, null, checkbox)
					}
				})
				
				requiredFields = π('.required')
				
				enableSubmit()
			}
			
			function fixDom(label, input, clickable) {
				var span = π.dom('span', label.textContent)
				label.fill(clickable ? [clickable, span] : [span, input])
			}
			
			function enableSubmit(){
				var submitButton = π1('input[type=submit]')
				submitButton.disabled = (requiredFields.find(function (field) {
					return field.π1('input').value == ''
				}))
				
				πd('invalidForm').className = submitButton.disabled ? '' : 'valid'
				
				requestAnimationFrame(enableSubmit)
			}
			
		})(window)
	</script>

	<style>
		.required {
			position: relative;
		}
		
		.required:after {
			content: '*';
			position: absolute;
			top: 10px;
			right: -10px;
			color: red;
		}
		
		input[type=submit]:disabled {
			opacity: 0.25;
			cursor: default;
		}

		input[type=submit]:disabled:hover {
			color: black;
			background-color: #C5D5A6;
		}
		
		#invalidForm {
			color: red;
			font-style: italic;
			margin-top: 20px;
		}
		
		#invalidForm.valid {
			display: none;
		}
	</style>


