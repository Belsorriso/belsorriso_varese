import 'dotenv/config';
import mongoose from 'mongoose';
import User from './models/User.js';
import Content from './models/Content.js';

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@belsorriso.it' });
    if (!adminExists) {
      await User.create({
        name: 'Amministratore',
        email: 'admin@belsorriso.it',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Admin user created: admin@belsorriso.it / admin123');
    } else {
      console.log('Admin user already exists');
    }

    // Seed initial content
    const homeContent = [
      {
        page: 'home',
        section: 'hero',
        content: {
          title: 'Camere private, comfort garantito',
          subtitle: 'Relax e charme in un cortile dal fascino d\'altri tempi',
          buttonText: 'Controlla Disponibilita',
          buttonLink: 'https://belsorrisovarese.kross.travel/'
        }
      },
      {
        page: 'home',
        section: 'welcome',
        content: {
          title: 'Benvenuti a BelSorriso Varese',
          paragraph1: 'La nostra struttura si trova in posizione strategica, vicino al centro di Varese, alle stazioni ferroviarie e agli ospedali. Offriamo camere silenziose con ingresso indipendente e Wi-Fi gratuito.',
          paragraph2: 'Ambiente accogliente ed informale con entrata autonoma in una corte dal fascino d\'altri tempi. Le nostre camere sono completamente ristrutturate e dotate di ogni comfort per garantirvi un soggiorno piacevole.'
        }
      },
      {
        page: 'home',
        section: 'features',
        content: [
          { icon: '🏠', title: 'Posizione Centrale', description: 'A 250 metri dalle stazioni ferroviarie e a 4 minuti a piedi dal centro citta' },
          { icon: '🚪', title: 'Ingresso Indipendente', description: 'Entrata autonoma in un cortile riservato per la massima privacy' },
          { icon: '📶', title: 'Wi-Fi Gratuito', description: 'Connessione wireless ADSL sempre attiva in tutte le camere' },
          { icon: '🏥', title: 'Vicino agli Ospedali', description: 'A soli 60 metri dall\'Ospedale Filippo del Ponte' }
        ]
      }
    ];

    const footerContent = {
      page: 'footer',
      section: 'main',
      content: {
        title: 'BelsorrisoVarese – Dormire Felice',
        companies: [
          {
            name: 'Select di Pecchio Nicolo',
            address: 'Piazza Biroldi, 8',
            city: '21100 – Varese (VA) – Italia',
            piva: 'P. IVA 02087850125',
            cin: 'CIN IT012133B45H2APG6U'
          },
          {
            name: 'Happi Day srl',
            address: 'Piazza Biroldi, 8',
            city: '21100 – Varese (VA) – Italia',
            piva: 'P. IVA 02964020123',
            cin: 'CIN IT012133B4I9KHS63N'
          },
          {
            name: 'Happi Cav',
            cin: 'CIN IT012133B4ZUUYL2CK',
            codes: ['012133-CIM-00013', '012133-CIM-00011']
          }
        ],
        contacts: {
          email: 'belsorrisovarese@gmail.com',
          phone: '+39 0332 830744',
          mobile: '+39 342 18 95 829'
        },
        social: {
          facebook: 'https://www.facebook.com/belsorrisovarese'
        }
      }
    };

    for (const item of homeContent) {
      await Content.findOneAndUpdate(
        { page: item.page, section: item.section },
        item,
        { upsert: true }
      );
    }
    await Content.findOneAndUpdate(
      { page: footerContent.page, section: footerContent.section },
      footerContent,
      { upsert: true }
    );

    console.log('Content seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedData();
