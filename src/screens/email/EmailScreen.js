import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

export default function EmailScreen() {
    const [destinatario, setDestinatario] = useState('');
    const [assunto, setAssunto] = useState('');
    const [corpo, setCorpo] = useState('');
  
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Enviar e-mail</Text>
        <TextInput
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 8 }}
          placeholder="Destinatário"
          value={destinatario}
          onChangeText={setDestinatario}
        />
        <TextInput
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 8 }}
          placeholder="Assunto"
          value={assunto}
          onChangeText={setAssunto}
        />
        <TextInput
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, height: 200, marginBottom: 16 }}
          placeholder="Corpo do e-mail"
          value={corpo}
          onChangeText={setCorpo}
          multiline
        />
        <Button
          title="Enviar e-mail"
          onPress={() => {
            MailComposer.composeAsync({
              recipients: [destinatario],
              subject: assunto,
              body: corpo,
            });
          }}
        />
      </View>
    );
  }
  