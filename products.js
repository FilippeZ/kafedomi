// Product data for Kafedomi vending machines
const products = [
    {
        id: 'coffee-premium-bean',
        category: 'coffee',
        name: {
            en: 'Premium Bean-to-Cup Coffee Machine',
            gr: 'Μηχανή Καφέ Premium Bean-to-Cup'
        },
        description: {
            en: 'Professional bean-to-cup coffee machine delivering barista-quality espresso, cappuccino, and specialty drinks. Perfect for offices and hotels demanding premium coffee experiences.',
            gr: 'Επαγγελματική μηχανή καφέ bean-to-cup που προσφέρει espresso, cappuccino και ειδικά ροφήματα ποιότητας barista. Ιδανική για γραφεία και ξενοδοχεία που απαιτούν premium εμπειρία καφέ.'
        },
        features: {
            en: [
                'Freshly ground beans for every cup',
                'Customizable strength and temperature',
                'Multiple drink varieties (Espresso, Cappuccino, Latte)',
                'Touch screen interface',
                'Automatic cleaning system',
                'Energy-saving mode'
            ],
            gr: [
                'Φρεσκοαλεσμένα κόκκοι για κάθε φλιτζάνι',
                'Προσαρμόσιμη ένταση και θερμοκρασία',
                'Πολλαπλές ποικιλίες ροφημάτων (Espresso, Cappuccino, Latte)',
                'Οθόνη αφής',
                'Αυτόματο σύστημα καθαρισμού',
                'Λειτουργία εξοικονόμησης ενέργειας'
            ]
        },
        specifications: {
            capacity: '2.5kg beans, 4L water',
            dimensions: '60cm x 70cm x 180cm',
            power: '2.4kW',
            cupsPerDay: '200-300'
        },
        images: [
            'images/bandicam 2026-02-06 15-10-48-672.jpg',
            'images/bandicam 2026-02-06 15-10-52-453.jpg'
        ]
    },
    {
        id: 'snack-combo-deluxe',
        category: 'snacks',
        name: {
            en: 'Deluxe Snack & Food Vending Machine',
            gr: 'Deluxe Μηχανή Αυτόματης Πώλησης Σνακ & Τροφίμων'
        },
        description: {
            en: 'Large-capacity snack vending machine with temperature control for fresh food. Ideal for factories, hospitals, and high-traffic locations requiring diverse food options.',
            gr: 'Μηχανή αυτόματης πώλησης σνακ μεγάλης χωρητικότητας με έλεγχο θερμοκρασίας για φρέσκα τρόφιμα. Ιδανική για εργοστάσια, νοσοκομεία και χώρους υψηλής κίνησης που απαιτούν ποικιλία επιλογών.'
        },
        features: {
            en: [
                'Fresh daily delivery options',
                'Temperature-controlled compartments',
                'Healthy alternatives section',
                'Top-tier brand selection',
                'Cashless payment systems',
                'Real-time inventory tracking'
            ],
            gr: [
                'Επιλογές φρέσκιας καθημερινής παράδοσης',
                'Θερμοκρασιακά ελεγχόμενα διαμερίσματα',
                'Τμήμα υγιεινών εναλλακτικών',
                'Επιλογή κορυφαίων brands',
                'Συστήματα ανέπαφης πληρωμής',
                'Παρακολούθηση αποθέματος σε πραγματικό χρόνο'
            ]
        },
        specifications: {
            capacity: '60 selections',
            dimensions: '90cm x 85cm x 185cm',
            power: '0.8kW',
            temperature: '3-7°C (chilled section)'
        },
        images: [
            'images/bandicam 2026-02-06 15-10-55-195.jpg',
            'images/bandicam 2026-02-06 15-10-57-883.jpg',
            'images/bandicam 2026-02-06 15-11-01-396.jpg'
        ]
    },
    {
        id: 'drink-cooler-pro',
        category: 'drinks',
        name: {
            en: 'Professional Drink Cooler',
            gr: 'Επαγγελματικό Ψυγείο Ποτών'
        },
        description: {
            en: 'High-capacity refrigerated drink vending machine with optimal cooling technology. Perfect for keeping beverages ice-cold in any environment.',
            gr: 'Ψυγείο ποτών υψηλής χωρητικότητας με βέλτιστη τεχνολογία ψύξης. Ιδανικό για να διατηρεί τα ποτά παγωμένα σε οποιοδήποτε περιβάλλον.'
        },
        features: {
            en: [
                'Optimal cooling (2-4°C)',
                'Wide selection of beverages',
                'Energy-efficient compressor',
                'LED interior lighting',
                'Anti-theft security',
                'Mobile payment ready'
            ],
            gr: [
                'Βέλτιστη ψύξη (2-4°C)',
                'Μεγάλη ποικιλία ποτών',
                'Ενεργειακά αποδοτικός συμπιεστής',
                'Εσωτερικός φωτισμός LED',
                'Ασφάλεια κατά κλοπής',
                'Έτοιμο για mobile πληρωμές'
            ]
        },
        specifications: {
            capacity: '400-500 cans/bottles',
            dimensions: '95cm x 80cm x 185cm',
            power: '1.2kW',
            temperature: '2-4°C'
        },
        images: [
            'images/bandicam 2026-02-06 15-11-04-749.jpg',
            'images/bandicam 2026-02-06 15-11-11-429.jpg'
        ]
    },
    {
        id: 'combo-ultimate',
        category: 'combo',
        name: {
            en: 'Ultimate Combo Vending Solution',
            gr: 'Απόλυτη Λύση Combo Vending'
        },
        description: {
            en: 'All-in-one vending solution combining coffee, snacks, and cold drinks in a single unit. Maximum convenience for medium to large workplaces.',
            gr: 'Ολοκληρωμένη λύση vending που συνδυάζει καφέ, σνακ και κρύα ποτά σε μία μονάδα. Μέγιστη ευκολία για μεσαίους έως μεγάλους χώρους εργασίας.'
        },
        features: {
            en: [
                'Coffee machine integrated',
                'Snack and drink sections',
                'Single payment system',
                'Compact footprint',
                'Unified inventory management',
                '24/7 remote monitoring'
            ],
            gr: [
                'Ενσωματωμένη μηχανή καφέ',
                'Τμήματα σνακ και ποτών',
                'Ενιαίο σύστημα πληρωμής',
                'Συμπαγές αποτύπωμα',
                'Ενοποιημένη διαχείριση αποθέματος',
                'Απομακρυσμένη παρακολούθηση 24/7'
            ]
        },
        specifications: {
            capacity: 'Coffee: 1.5kg beans, Snacks: 40 selections, Drinks: 200 units',
            dimensions: '120cm x 90cm x 190cm',
            power: '3.2kW',
            cupsPerDay: '150-200'
        },
        images: [
            'images/bandicam 2026-02-06 15-11-14-588.jpg',
            'images/bandicam 2026-02-06 15-11-17-578.jpg',
            'images/bandicam 2026-02-06 15-11-24-124.jpg'
        ]
    },
    {
        id: 'coffee-espresso-compact',
        category: 'coffee',
        name: {
            en: 'Compact Espresso Station',
            gr: 'Συμπαγής Σταθμός Espresso'
        },
        description: {
            en: 'Space-saving espresso machine perfect for small offices and boutique hotels. Professional quality in a compact design.',
            gr: 'Μηχανή espresso που εξοικονομεί χώρο, ιδανική για μικρά γραφεία και boutique ξενοδοχεία. Επαγγελματική ποιότητα σε συμπαγή σχεδιασμό.'
        },
        features: {
            en: [
                'Professional espresso quality',
                'Small footprint design',
                'Quick heat-up time',
                'Easy maintenance',
                'Multiple cup sizes',
                'Low noise operation'
            ],
            gr: [
                'Επαγγελματική ποιότητα espresso',
                'Σχεδιασμός μικρού αποτυπώματος',
                'Γρήγορος χρόνος θέρμανσης',
                'Εύκολη συντήρηση',
                'Πολλαπλά μεγέθη φλιτζανιών',
                'Χαμηλή λειτουργία θορύβου'
            ]
        },
        specifications: {
            capacity: '1kg beans, 2L water',
            dimensions: '45cm x 55cm x 160cm',
            power: '1.8kW',
            cupsPerDay: '80-120'
        },
        images: [
            'images/bandicam 2026-02-06 15-11-27-097.jpg',
            'images/bandicam 2026-02-06 15-11-29-340.jpg'
        ]
    },
    {
        id: 'snack-healthy-choice',
        category: 'snacks',
        name: {
            en: 'Healthy Choice Snack Machine',
            gr: 'Μηχανή Σνακ Υγιεινών Επιλογών'
        },
        description: {
            en: 'Specialized vending machine focused on healthy snacks, organic options, and nutritious alternatives. Perfect for health-conscious workplaces.',
            gr: 'Εξειδικευμένη μηχανή αυτόματης πώλησης που εστιάζει σε υγιεινά σνακ, βιολογικές επιλογές και θρεπτικές εναλλακτικές. Ιδανική για χώρους εργασίας με έμφαση στην υγεία.'
        },
        features: {
            en: [
                'Organic and natural products',
                'Nutritional information display',
                'Allergen labeling',
                'Fresh fruit options',
                'Protein bars and healthy snacks',
                'Vegan and gluten-free selections'
            ],
            gr: [
                'Βιολογικά και φυσικά προϊόντα',
                'Εμφάνιση διατροφικών πληροφοριών',
                'Επισήμανση αλλεργιογόνων',
                'Επιλογές φρέσκων φρούτων',
                'Μπάρες πρωτεΐνης και υγιεινά σνακ',
                'Vegan και χωρίς γλουτένη επιλογές'
            ]
        },
        specifications: {
            capacity: '45 selections',
            dimensions: '85cm x 75cm x 180cm',
            power: '0.6kW',
            temperature: '5-8°C'
        },
        images: [
            'images/bandicam 2026-02-06 15-11-32-092.jpg',
            'images/bandicam 2026-02-06 15-11-34-537.jpg'
        ]
    },
    {
        id: 'drink-energy-sports',
        category: 'drinks',
        name: {
            en: 'Energy & Sports Drink Station',
            gr: 'Σταθμός Ενεργειακών & Αθλητικών Ποτών'
        },
        description: {
            en: 'Specialized cooler for energy drinks, sports beverages, and functional drinks. Ideal for gyms, factories, and active workplaces.',
            gr: 'Εξειδικευμένο ψυγείο για ενεργειακά ποτά, αθλητικά ροφήματα και λειτουργικά ποτά. Ιδανικό για γυμναστήρια, εργοστάσια και ενεργούς χώρους εργασίας.'
        },
        features: {
            en: [
                'Extra-cold temperature control',
                'Energy drink selection',
                'Sports hydration options',
                'Vitamin-enhanced beverages',
                'Quick-access design',
                'High-capacity storage'
            ],
            gr: [
                'Έλεγχος εξαιρετικά χαμηλής θερμοκρασίας',
                'Επιλογή ενεργειακών ποτών',
                'Επιλογές αθλητικής ενυδάτωσης',
                'Ροφήματα εμπλουτισμένα με βιταμίνες',
                'Σχεδιασμός γρήγορης πρόσβασης',
                'Αποθήκευση υψηλής χωρητικότητας'
            ]
        },
        specifications: {
            capacity: '350 units',
            dimensions: '90cm x 75cm x 180cm',
            power: '1.0kW',
            temperature: '1-3°C'
        },
        images: [
            'images/bandicam 2026-02-06 15-11-45-178.jpg',
            'images/bandicam 2026-02-06 15-11-48-765.jpg'
        ]
    },
    {
        id: 'micromarket-solution',
        category: 'combo',
        name: {
            en: 'Micro Market Solution',
            gr: 'Λύση Micro Market'
        },
        description: {
            en: 'Complete self-service micro market with open shelving, refrigerated sections, and self-checkout kiosk. Transform any space into a mini convenience store.',
            gr: 'Πλήρης λύση micro market αυτοεξυπηρέτησης με ανοιχτά ράφια, ψυγεία και kiosk αυτόματης πληρωμής. Μετατρέψτε οποιονδήποτε χώρο σε mini κατάστημα ευκολίας.'
        },
        features: {
            en: [
                'Open shelving design',
                'Self-checkout kiosk',
                'Refrigerated and ambient sections',
                'Fresh food daily delivery',
                'Inventory management system',
                'Security cameras integrated'
            ],
            gr: [
                'Σχεδιασμός ανοιχτών ραφιών',
                'Kiosk αυτόματης πληρωμής',
                'Ψυγεία και τμήματα περιβάλλοντος',
                'Καθημερινή παράδοση φρέσκων τροφίμων',
                'Σύστημα διαχείρισης αποθέματος',
                'Ενσωματωμένες κάμερες ασφαλείας'
            ]
        },
        specifications: {
            capacity: '200+ products',
            dimensions: 'Modular (custom sizing)',
            power: '2.5kW',
            area: '15-30 sq meters'
        },
        images: [
            'images/bandicam 2026-02-06 15-11-52-152.jpg',
            'images/bandicam 2026-02-06 15-11-55-823.jpg',
            'images/bandicam 2026-02-06 15-12-13-681.jpg'
        ]
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = products;
}
