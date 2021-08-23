import React, { useState } from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
  SafeAreaView
} from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import DatePicker from 'react-native-datepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const SubmitSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  subject: Yup.string()
    .min(10, 'Too Short!')
    .required('Please add a subject.'),
  description: Yup.string()
    .min(80, 'Too Short!')
    .required('Please add a short description.'),
  date: Yup.string()
    .max(11, 'Is this a date')
    .required('Please enter dob.'),
  contact: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
});

function FormScreen() {
  const [date, setDate] = useState(new Date());
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10
    },
    error: {
      textAlign: 'center'
    },
    text: {
      width: '25%',
      textAlign: 'center',
      padding: 10
    },
    input: {
      borderWidth: 1,
      borderRadius: 10,
      width: '75%',
      padding: 10
    },
    description: {
      borderWidth: 1,
      borderRadius: 10,
      width: '75%',
      padding: 10,
      height: 100
    },
    submitView: {
      padding: 20,
      width: '60%',
      alignSelf: 'center'
    }
  });
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <View>
          <Formik
            initialValues={{
              email: '',
              subject: '',
              description: '',
              contact: '',
              date: '26 Aug 2021'
            }}
            validationSchema={SubmitSchema}
            onSubmit={values => values}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              errors,
              values
            }) => (
              <View style={{ padding: 10 }}>
                <View style={styles.row}>
                  <Text style={styles.text}>Email</Text>
                  <TextInput
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    style={styles.input}
                    placeholder="Please enter email"
                  />
                </View>
                {errors.email ? (
                  <Text style={styles.error}>{errors.email}</Text>
                ) : null}
                <View style={styles.row}>
                  <Text style={styles.text}>Subject</Text>
                  <TextInput
                    onChangeText={handleChange('subject')}
                    onBlur={handleBlur('subject')}
                    value={values.subject}
                    style={styles.input}
                    placeholder="Please enter subject"
                  />
                </View>
                {errors.subject ? (
                  <Text style={styles.error}>{errors.subject}</Text>
                ) : null}
                <View style={styles.row}>
                  <Text style={styles.text}>Description</Text>
                  <TextInput
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    value={values.description}
                    style={styles.description}
                    placeholder="Describe your concern"
                  />
                </View>
                {errors.description ? (
                  <Text style={styles.error}>{errors.description}</Text>
                ) : null}
                <View style={styles.row}>
                  <Text style={styles.text}>Contact</Text>
                  <TextInput
                    onChangeText={handleChange('contact')}
                    onBlur={handleBlur('contact')}
                    value={values.contact}
                    keyboardType="numeric"
                    style={styles.input}
                    placeholder="Enter your contact info"
                  />
                </View>
                {errors.contact ? (
                  <Text style={styles.error}>{errors.contact}</Text>
                ) : null}
                <View style={styles.row}>
                  <Text style={styles.text}>Date of Birth</Text>
                  <DatePicker
                    style={{ width: 200, alignSelf: 'center' }}
                    date={date}
                    mode="date"
                    placeholder="select date"
                    format="DD MMM YYYY"
                    minDate="01 Jan 2021"
                    maxDate="30 Dec 2025"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={newDate => {
                      setFieldValue('date', newDate);
                      setDate(newDate);
                    }}
                    value={date}
                    onBlur={handleBlur('date')}
                  />
                </View>
                {errors.date ? (
                  <Text style={styles.error}>{errors.date}</Text>
                ) : null}
                <View style={styles.submitView}>
                  <Button onPress={handleSubmit} title="Submit" />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default FormScreen;
