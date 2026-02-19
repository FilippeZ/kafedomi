// Product data for Kafedomi vending machines
const products = [
    // ===== COFFEE VENDING MACHINES =====
    {
        id: 'coffee-necta-astro',
        relatedProducts: ['coffee-necta-brio', 'coffee-necta-kikko', 'snack-necta-snakky'],
        category: 'vending-coffee',
        type: 'floor-standing',
        brand: 'necta',
        name: {
            en: 'Necta Astro',
            gr: 'Necta Astro'
        },
        description: {
            en: 'A winning solution for medium to large locations. Offers 18 direct selections and an innovative design that meets the expectations of the most demanding customers.',
            gr: 'Μια κερδοφόρα λύση για μεσαίους και μεγάλους χώρους. Προσφέρει 18 άμεσες επιλογές και καινοτόμο σχεδιασμό που ανταποκρίνεται στις προσδοκίες των πιο απαιτητικών πελατών.'
        },
        features: {
            en: ['Customizable drink menu', 'Z3000 coffee brewer', 'Cup sensor for guaranteed vend', '18 direct selections', 'Display screen progress bar'],
            gr: ['Προσαρμόσιμο μενού ροφημάτων', 'Z3000 coffee brewer', 'Αισθητήρας κυπέλλου', '18 άμεσες επιλογές', 'Μπάρα προόδου στην οθόνη']
        },
        specifications: {
            capacity: '650 cups, 575 stirrers',
            dimensions: '183cm x 65cm x 74.2cm',
            power: '2400 W',
            weight: '180 kg'
        },
        images: [
            'images/necta-astro.jpg'
        ]
    },
    {
        id: 'coffee-necta-brio',
        relatedProducts: ['coffee-necta-astro', 'coffee-necta-kikko', 'coffee-illy-mitaca-smart30'],
        category: 'vending-coffee',
        type: 'floor-standing',
        brand: 'necta',
        name: {
            en: 'Necta Brio',
            gr: 'Necta Brio'
        },
        description: {
            en: 'The evolution of a winner. Brio offers higher capacity and new features in a compact size, perfectly meeting latest consumer requirements.',
            gr: 'Η εξέλιξη ενός νικητή. Το Brio προσφέρει μεγαλύτερη χωρητικότητα και νέα χαρακτηριστικά σε συμπαγές μέγεθος, καλύπτοντας απόλυτα τις τελευταίες απαιτήσεις των καταναλωτών.'
        },
        features: {
            en: ['14 direct selections', 'Z3000 Espresso brewer', '300 cups capacity', '16-bit electronic control', 'Master/slave connection'],
            gr: ['14 άμεσες επιλογές', 'Z3000 Espresso brewer', 'Χωρητικότητα 300 κύπελλα', 'Ηλεκτρονικός έλεγχος 16-bit', 'Σύνδεση Master/slave']
        },
        specifications: {
            capacity: '300 cups',
            dimensions: '76cm x 54cm x 58.5cm',
            power: '1.5kW',
            type: 'Tabletop-capable'
        },
        images: [
            'images/necta-brio.jpg'
        ]
    },
    {
        id: 'coffee-necta-kikko',
        relatedProducts: ['coffee-necta-astro', 'coffee-necta-brio', 'snack-necta-sfera'],
        category: 'vending-coffee',
        type: 'floor-standing',
        brand: 'necta',
        name: {
            en: 'Necta Kikko',
            gr: 'Necta Kikko'
        },
        description: {
            en: 'Simplicity, reliability, and versatility. Kikko is suitable for any professional location desiring an uncomplicated and dependable hot drink vending solution.',
            gr: 'Απλότητα, αξιοπιστία και ευελιξία. Το Kikko είναι κατάλληλο για κάθε επαγγελματικό χώρο που επιθυμεί μια εύκολη και αξιόπιστη λύση αυτόματης πώλησης ζεστών ροφημάτων.'
        },
        features: {
            en: ['16 direct selections', 'Z3000 coffee/leaf tea brewer', 'Ergonomic dispensing bay', 'Sleek and professional design', '16-bit electronics'],
            gr: ['16 άμεσες επιλογές', 'Z3000 coffee/leaf tea brewer', 'Εργονομική θυρίδα παραλαβής', 'Κομψός και επαγγελματικός σχεδιασμός', 'Ηλεκτρονικά 16-bit']
        },
        specifications: {
            capacity: '500 cups',
            dimensions: '170cm x 54cm x 69cm',
            power: '1.8kW',
            electronics: '16-bit'
        },
        images: [
            'images/necta-kikko.jpg',
            'images/necta-kikko-2.png',
            'images/necta-kikko-3.png'
        ]
    },
    {
        id: 'coffee-fas-400',
        relatedProducts: ['coffee-necta-astro', 'coffee-necta-kikko', 'snack-sielaff-fs2020'],
        category: 'vending-coffee',
        type: 'floor-standing',
        brand: 'illy',
        name: {
            en: 'FAS 400',
            gr: 'FAS 400'
        },
        description: {
            en: 'The ideal solution for companies of all sizes. A true point of reference for the company break with its elegant design and advanced features.',
            gr: 'Η ιδανική λύση για εταιρείες όλων των μεγεθών. Ένα πραγματικό σημείο αναφοράς για το διάλειμμα της εταιρείας με τον κομψό του σχεδιασμό και τα προηγμένα χαρακτηριστικά του.'
        },
        features: {
            en: ['Capsule Container (250 pods)', '4 soluble containers', 'Sugar container', 'Up to 400 cups', 'Simple diameter adjustment'],
            gr: ['Θήκη για Κάψουλες (250 κάψουλες)', '4 κάνιστρα στιγμιαίων', 'Κάνιστρο ζάχαρης', 'Έως 400 κύπελλα', 'Απλή ρύθμιση διαμέτρου κυπέλλου']
        },
        specifications: {
            capacity: '400 cups, 250 capsules',
            dimensions: '53cm x 58cm x 170cm',
            power: '230 V, 50 Hz',
            weight: '110 kg'
        },
        images: [
            'images/fas-400.png',
            'images/fas-400-2.jpg'
        ]
    },
    {
        id: 'coffee-illy-mitaca-smart30',
        relatedProducts: ['coffee-lavazza-blue', 'coffee-gaggia-cadorna', 'coffee-necta-brio'],
        category: 'coffee-capsule',
        type: 'tabletop',
        brand: 'illy',
        name: {
            en: 'illy Mitaca Smart30',
            gr: 'illy Mitaca Smart30'
        },
        description: {
            en: 'Compact Italian design meets professional performance. The Smart30 is the perfect solution for small to medium offices (up to 20 people) looking for the authentic illy experience.',
            gr: 'Ο συμπαγής ιταλικός σχεδιασμός συναντά την επαγγελματική απόδοση. Το Smart30 είναι η τέλεια λύση για μικρά έως μεσαία γραφεία (έως 20 άτομα) που αναζητούν την αυθεντική εμπειρία illy.'
        },
        features: {
            en: ['Auto stop functionality', '2 programmable doses', 'Adjustable rack height', '2.5L water tank', 'Large capsule drawer (25 pods)'],
            gr: ['Λειτουργία Auto stop', '2 προγραμματιζόμενες δόσεις', 'Ρυθμιζόμενο ύψος σχάρας', 'Δοχείο νερού 2,5 λίτρων', 'Μεγάλο συρτάρι καψουλών (25 κάψουλες)']
        },
        specifications: {
            capacity: '2.5L water, 25 capsules',
            dimensions: '15cm x 38cm x 28.5cm',
            weight: '4.4 kg',
            origin: 'Made in Italy'
        },
        images: [
            'images/illy Mitaca Smart30 Coffee Machine.jpg'
        ]
    },
    {
        id: 'coffee-lavazza-blue',
        relatedProducts: ['coffee-illy-mitaca-smart30', 'coffee-gaggia-cadorna', 'snack-necta-snakky'],
        category: 'coffee-capsule',
        type: 'tabletop',
        brand: 'lavazza',
        name: {
            en: 'Lavazza BLUE',
            gr: 'Lavazza BLUE'
        },
        description: {
            en: 'Premium coffee quality for your office. Lavazza BLUE meets individual requirements with a wide variety of coffees and delicious hot chocolate options.',
            gr: 'Ποιότητα premium καφέ για το γραφείο σας. Το Lavazza BLUE καλύπτει τις ατομικές απαιτήσεις με μεγάλη ποικιλία καφέδων και επιλογές ζεστής σοκολάτας.'
        },
        features: {
            en: ['High Pressure Extraction', 'Superior Crema', 'Pre-Infusion brewing', 'Thermoblock temp control', 'Self-Protected Capsules'],
            gr: ['Εκχύλιση υψηλής πίεσης', 'Ανώτερη κρέμα', 'Προ-έγχυση αρωμάτων', 'Έλεγχος Thermoblock', 'Κάψουλες προστασίας αρώματος']
        },
        specifications: {
            pressure: 'High pressure system',
            variety: 'Coffee & Chocolate',
            system: 'Lavazza BLUE Capsules',
            temp: 'Optimal thermal control'
        },
        images: [
            'images/Lavazza-Logo.png',
            'images/Lavazza BLUE capsule.png'
        ]
    },

    // ===== SNACK VENDING =====
    {
        id: 'snack-combo-deluxe',
        relatedProducts: ['snack-necta-snakky', 'snack-necta-rondo', 'vending-drinks-vendo-682'],
        category: 'vending-snacks',
        type: 'floor-standing',
        brand: 'necta',
        name: {
            en: 'Bianchi BVM 685',
            gr: 'Bianchi BVM 685'
        },
        description: {
            en: 'Large-capacity snack vending machine with temperature control for fresh food. Ideal for factories, hospitals, and high-traffic locations requiring diverse food options.',
            gr: 'Μηχανή αυτόματης πώλησης σνακ μεγάλης χωρητικότητας με έλεγχο θερμοκρασίας για φρέσκα τρόφιμα. Ιδανική για εργοστάσια, νοσοκομεία και χώρους υψηλής κίνησης που απαιτούν ποικιλία επιλογών.'
        },
        features: {
            en: ['Temperature Control', 'Cashless Payment', 'Smart Inventory', '60 Selections', 'Energy A++'],
            gr: ['Έλεγχος Θερμοκρασίας', 'Ανέπαφη Πληρωμή', 'Έξυπνο Απόθεμα', '60 Επιλογές', 'Ενέργεια A++']
        },
        specifications: {
            capacity: '60 selections',
            dimensions: '90cm x 85cm x 185cm',
            power: '0.8kW',
            temperature: '3-7°C (chilled section)'
        },
        images: [
            'images/bianchi-bvm-685.jpg'
        ]
    },
    {
        id: 'snack-necta-snakky',
        relatedProducts: ['snack-necta-sfera', 'snack-necta-rondo', 'coffee-necta-brio'],
        category: 'vending-snacks',
        type: 'floor-standing',
        brand: 'necta',
        name: {
            en: 'Necta Snakky',
            gr: 'Necta Snakky'
        },
        description: {
            en: 'Compact and highly flexible snack and drink machine. Best suited for smaller locations with less available floor space.',
            gr: 'Συμπαγές και εξαιρετικά ευέλικτο μηχάνημα σνακ και ποτών. Ιδανικό για μικρότερους χώρους με περιορισμένο διαθέσιμο χώρο δαπέδου.'
        },
        features: {
            en: ['Compact dimensions', 'Flexible layout', 'Up to 338 products', 'Cans, bottles, and snacks', 'Excellent capacity/size ratio'],
            gr: ['Συμπαγείς διαστάσεις', 'Ευέλικτη διάταξη', 'Έως 338 προϊόντα', 'Κουτάκια, μπουκάλια και σνακ', 'Εξαιρετική αναλογία χωρητικότητας/μεγέθους']
        },
        specifications: {
            capacity: '338 products',
            dimensions: '170cm x 70.7cm x 80cm',
            protocol: 'MDB, Executive'
        },
        images: [
            'images/necta-snakky.jpg'
        ]
    },
    {
        id: 'snack-necta-sfera',
        relatedProducts: ['snack-necta-snakky', 'snack-necta-rondo', 'coffee-necta-kikko'],
        category: 'vending-snacks',
        type: 'floor-standing',
        brand: 'necta',
        name: {
            en: 'Necta Sfera',
            gr: 'Necta Sfera'
        },
        description: {
            en: 'Offering protection and service in inside vending. Wide variety of food products, snacks, bottles and cans with excellent capacity to size ratio.',
            gr: 'Προσφέρει προστασία και εξυπηρέτηση στην πώληση εσωτερικών χώρων. Μεγάλη ποικιλία τροφίμων, σνακ, μπουκαλιών και κουτιών με εξαιρετική αναλογία χωρητικότητας προς μέγεθος.'
        },
        features: {
            en: ['Armored user interface', 'Shatterproof window', 'Metalic numeric keypad', '5 direct selections', 'Good visibility'],
            gr: ['Θωρακισμένη διεπαφή χρήστη', 'Άθραυστο παράθυρο', 'Μεταλλικό αριθμητικό πληκτρολόγιο', '5 άμεσες επιλογές', 'Καλή ορατότητα']
        },
        specifications: {
            dimensions: '183cm x 88cm x 89cm',
            glass: 'Shatterproof'
        },
        images: [
            'images/necta-sfera.jpg'
        ]
    },
    {
        id: 'snack-necta-rondo',
        relatedProducts: ['snack-necta-snakky', 'snack-combo-deluxe', 'vending-drinks-dixie-501e'],
        category: 'vending-snacks',
        type: 'floor-standing',
        brand: 'necta',
        name: {
            en: 'Necta Rondo',
            gr: 'Necta Rondo'
        },
        description: {
            en: 'Simple yet elegant snack and drink vending solution. Able to stock up to 40 different products with five direct selection buttons.',
            gr: 'Απλή αλλά κομψή λύση αυτόματης πώλησης σνακ και ποτών. Δυνατότητα αποθήκευσης έως και 40 διαφορετικών προϊόντων με πέντε κουμπιά άμεσης επιλογής.'
        },
        features: {
            en: ['Up to 40 products', '5 direct selections', 'Automatic setup', 'Bi-zone temperature', 'Photocells'],
            gr: ['Έως 40 προϊόντα', '5 άμεσες επιλογές', 'Αυτόματη ρύθμιση', 'Θερμοκρασία διπλής ζώνης', 'Φωτοκύτταρα']
        },
        specifications: {
            capacity: 'Up to 48 selections',
            dimensions: '183cm x 88cm x 89cm',
            weight: '225 kg',
            energy: 'A Rating'
        },
        images: [
            'images/necta-rondo.png'
        ]
    },
    {
        id: 'snack-sielaff-fs2020',
        relatedProducts: ['snack-combo-deluxe', 'snack-necta-sfera', 'coffee-fas-400'],
        category: 'vending-snacks',
        type: 'floor-standing',
        brand: 'Sielaff',
        name: {
            en: 'Sielaff FS 2020',
            gr: 'Sielaff FS 2020'
        },
        description: {
            en: 'A robust and reliable spiral vending machine acting as a 24/7 shop. Flexible configuration for snacks, confectionery, cans and bottles.',
            gr: 'Μια στιβαρή και αξιόπιστη μηχανή αυτόματης πώλησης με σπιράλ που λειτουργεί ως κατάστημα 24/7. Ευέλικτη διαμόρφωση για σνακ, ζαχαρώδη, κουτάκια και μπουκάλια.'
        },
        features: {
            en: ['Stainless steel panels', 'Secure locking system', 'Energy saving mode', 'High capacity', 'Spiral delivery'],
            gr: ['Πάνελ από ανοξείδωτο χάλυβα', 'Ασφαλές σύστημα κλειδώματος', 'Λειτουργία εξοικονόμησης ενέργειας', 'Υψηλή χωρητικότητα', 'Παράδοση με σπιράλ']
        },
        specifications: {
            dimensions: '183cm x 99cm x 88cm',
            weight: '475 kg',
            power: '410 W'
        },
        images: [
            'images/sielaff-fs2020.png'
        ]
    },

    // ===== WATER SOLUTIONS =====
    {
        id: 'water-dispenser-pro',
        relatedProducts: ['water-vikos-500ml', 'water-vikos-10lt', 'water-cooler-yl1674t'],
        category: 'water-dispensers',
        type: 'floor-standing',
        brand: 'Premium',
        name: {
            en: 'HC66L Floor Standing Water Cooler (Inox)',
            gr: 'Επιδαπέδιος ψύκτης νερού HC66L (Inox)'
        },
        description: {
            en: 'Premium stainless steel floor-standing water cooler with elegant modern design. Provides hot, cold, and room temperature water with dual taps, separate on-off switches, and adjustable thermostat.',
            gr: 'Εκλεπτυσμένος επιδαπέδιος ψύκτης από inox πολυτελείας με κομψό και σύγχρονο σχεδιασμό. Παρέχει ζεστό, κρύο και νερό θερμοκρασίας δωματίου με διπλές βρύσες και ρυθμιζόμενο θερμοστάτη.'
        },
        features: {
            en: ['Hot, Cold & Room Temp', 'Stainless Steel Tank', 'Dual Taps', 'CE Certified', '1 Year Warranty'],
            gr: ['Ζεστό, Κρύο & Δωματίου', 'Ανοξείδωτος Κάδος', 'Διπλές Βρύσες', 'Πιστοποίηση CE', 'Εγγύηση 1 Έτους']
        },
        specifications: {
            capacity: '3.8L cold water, 1.3L hot water',
            dimensions: '33cm x 33cm x 96cm',
            power: '85W cold / 500W hot',
            weight: '15kg'
        },
        images: [
            'images/hc66l-inox.png'
        ]
    },
    {
        id: 'water-vikos-500ml',
        relatedProducts: ['water-vikos-10lt', 'water-dispenser-pro', 'water-cooler-yl1674t'],
        category: 'water-dispensers',
        type: 'bottle',
        brand: 'Vikos',
        name: {
            en: 'Vikos Natural Mineral Water 500ml',
            gr: 'Vikos Φυσικό Μεταλλικό Νερό 500ml'
        },
        description: {
            en: 'The classic 500ml PET bottle for refreshment on the go. Pure mineral water bottled at the source, maintaining all its nutritional properties and crystal clear taste.',
            gr: 'Η κλασική φιάλη PET 500ml για αναζωογόνηση κάθε στιγμή. Αγνό μεταλλικό νερό που εμφιαλώνεται στην πηγή, διατηρώντας όλες τις θρεπτικές του ιδιότητες και την κρυστάλλινη γεύση του.'
        },
        features: {
            en: ['Portable size', 'Recyclable PET', 'Fresh from Pindos mounts', 'Crystal clear taste', 'Daily hydration'],
            gr: ['Φορητό μέγεθος', 'Ανακυκλώσιμο PET', 'Φρέσκο από την Πίνδο', 'Κρυστάλλινη γεύση', 'Καθημερινή ενυδάτωση']
        },
        specifications: {
            volume: '500 ml',
            ph: '7.5',
            calcium: '101 mg/l',
            magnesium: '1.54 mg/l'
        },
        images: [
            'images/vikos_500ml.png'
        ]
    },
    {
        id: 'water-vikos-10lt',
        relatedProducts: ['water-vikos-500ml', 'water-dispenser-pro', 'water-cooler-yl1674t'],
        category: 'water-dispensers',
        type: 'bottle',
        brand: 'Vikos',
        name: {
            en: 'Vikos Natural Mineral Water 10lt',
            gr: 'Vikos Φυσικό Μεταλλικό Νερό 10lt'
        },
        description: {
            en: 'Natural mineral water directly from the Vikos source in Zagorochoria. The 10lt PET bottle is ergonomically designed for easy placement on water coolers, maintaining all the mineral properties.',
            gr: 'Φυσικό μεταλλικό νερό απευθείας από την πηγή Βίκος στα Ζαγοροχώρια. Η φιάλη PET 10lt είναι εργονομικά σχεδιασμένη για εύκολη τοποθέτηση σε ψύκτες νερού, διατηρώντας όλες τις μεταλλικές ιδιότητες.'
        },
        features: {
            en: ['Ergonomic design', 'Single-use PET', 'Rich in minerals', 'Easy to change'],
            gr: ['Εργονομικός σχεδιασμός', 'PET μίας χρήσης', 'Πλούσιο σε μέταλλα', 'Εύκολη αλλαγή']
        },
        specifications: {
            volume: '10 Liters',
            packaging: 'Recyclable PET',
            origin: 'Zagorochoria, Greece'
        },
        images: [
            'images/vikos_10lt.png'
        ]
    },
    // ===== NEW PRODUCTS FROM NEWIMG =====
    {
        id: 'vending-drinks-dixie-501e',
        relatedProducts: ['vending-drinks-vendo-682', 'snack-combo-deluxe', 'snack-sielaff-fs2020'],
        category: 'vending-drinks',
        type: 'floor-standing',
        brand: 'Dixie Narco',
        name: {
            en: 'Dixie Narco 501E',
            gr: 'Dixie Narco 501E'
        },
        description: {
            en: 'A legendary vending machine in the beverage industry, the 501E is recognized for its exceptional performance, reliability, and versatility. Approved for outdoor use.',
            gr: 'Μια θρυλική μηχανή αυτόματης πώλησης στη βιομηχανία ποτών, η 501E είναι αναγνωρισμένη για την εξαιρετική της απόδοση, αξιοπιστία και ευελιξία. Εγκεκριμένη για εξωτερική χρήση.'
        },
        features: {
            en: ['9 selections', '501 cans capacity', 'Outdoor approved', 'DEX and MDB compatible', 'High capacity refrigeration'],
            gr: ['9 επιλογές', 'Χωρητικότητα 501 κουτάκια', 'Εγκεκριμένο για εξωτερικό χώρο', 'Συμβατό με DEX και MDB', 'Ψύξη υψηλής απόδοσης']
        },
        specifications: {
            capacity: '501 cans (12oz) / 280 bottles (20oz)',
            dimensions: '72"H x 37"W x 35"D',
            power: '115 VAC, 60 Hz',
            weight: '865 lbs'
        },
        images: [
            'images/dixie-narco-501e.png'
        ]
    },
    {
        id: 'vending-drinks-vendo-682',
        relatedProducts: ['vending-drinks-dixie-501e', 'snack-combo-deluxe', 'snack-necta-sfera'],
        category: 'vending-drinks',
        type: 'floor-standing',
        brand: 'Sanden Vendo',
        name: {
            en: 'Sanden Vendo VDI 682',
            gr: 'Sanden Vendo VDI 682'
        },
        description: {
            en: 'High-performance cold drinks vending machine from the leading brand Sanden Vendo. Offers large capacity and robust reliability for busy locations.',
            gr: 'Μηχανή αυτόματης πώλησης κρύων ποτών υψηλής απόδοσης από την κορυφαία μάρκα Sanden Vendo. Προσφέρει μεγάλη χωρητικότητα και στιβαρή αξιοπιστία για χώρους υψηλής κίνησης.'
        },
        features: {
            en: ['10 selections', '680 cans capacity', 'Electronic control system', 'Energy efficient', 'Robust design'],
            gr: ['10 επιλογές', 'Χωρητικότητα 680 κουτάκια', 'Ηλεκτρονικό σύστημα ελέγχου', 'Ενεργειακά αποδοτικό', 'Στιβαρός σχεδιασμός']
        },
        specifications: {
            capacity: '680 cans',
            selections: '10',
            brand: 'Sanden Vendo'
        },
        images: [
            'images/sanden-vendo-682.jpg'
        ]
    },
    {
        id: 'coffee-gaggia-cadorna',
        relatedProducts: ['coffee-illy-mitaca-smart30', 'coffee-lavazza-blue', 'coffee-bianchi-bvm333'],
        category: 'coffee-capsule',
        type: 'tabletop',
        brand: 'Gaggia',
        name: {
            en: 'Gaggia Cadorna Prestige',
            gr: 'Gaggia Cadorna Prestige'
        },
        description: {
            en: '100% Italian excellence. The Cadorna Prestige offers up to 14 different beverages at the touch of a button, featuring an interactive TFT display and integrated milk carafe.',
            gr: '100% Ιταλική υπεροχή. Η Cadorna Prestige προσφέρει έως και 14 διαφορετικά ροφήματα με το πάτημα ενός κουμπιού, διαθέτοντας διαδραστική οθόνη TFT και ενσωματωμένη κανάτα γάλακτος.'
        },
        features: {
            en: ['14 different beverages', 'Integrated milk carafe', '100% Ceramic grinders', '4 user profiles', 'Over Ice Coffee function'],
            gr: ['14 διαφορετικά ροφήματα', 'Ενσωματωμένη κανάτα γάλακτος', '100% Κεραμικοί μύλοι', '4 προφίλ χρήστη', 'Λειτουργία Over Ice Coffee']
        },
        specifications: {
            pressure: '15 bar',
            power: '1900 W',
            capacity: '1.5L water tank',
            weight: '9.6 kg'
        },
        images: [
            'images/gaggia-cadorna.png'
        ]
    },
    {
        id: 'coffee-bianchi-bvm333',
        relatedProducts: ['coffee-gaggia-cadorna', 'coffee-necta-brio', 'coffee-lavazza-blue'],
        category: 'coffee-capsule',
        type: 'floor-standing',
        brand: 'Bianchi',
        name: {
            en: 'Bianchi BVM 333',
            gr: 'Bianchi BVM 333'
        },
        description: {
            en: 'Compact and reliable coffee vending machine from Bianchi. Ideal for office environments providing high-quality espresso and a variety of hot drinks.',
            gr: 'Συμπαγής και αξιόπιστη μηχανή αυτόματης πώλησης καφέ από την Bianchi. Ιδανική για περιβάλλοντα γραφείου, παρέχοντας υψηλής ποιότητας espresso και ποικιλία ζεστών ροφημάτων.'
        },
        features: {
            en: ['Compact design', 'Professional espresso group', 'Multiple hot drink options', 'Easy maintenance', 'Reliable performance'],
            gr: ['Συμπαγής σχεδιασμός', 'Επαγγελματικό γκρουπ espresso', 'Πολλαπλές επιλογές για ζεστά ροφήματα', 'Εύκολη συντήρηση', 'Αξιόπιστη απόδοση']
        },
        specifications: {
            type: 'Automatic',
            brand: 'Bianchi',
            origin: 'Italy'
        },
        images: [
            'images/bianchi-bvm-333.jpeg'
        ]
    },
    {
        id: 'water-cooler-yl1674t',
        relatedProducts: ['water-dispenser-pro', 'water-vikos-500ml', 'water-vikos-10lt'],
        category: 'water-dispensers',
        type: 'tabletop',
        brand: 'Premium',
        name: {
            en: 'YL1674T Tabletop Water Cooler',
            gr: 'Επιτραπέζιος ψύκτης νερού YL1674T'
        },
        description: {
            en: 'Elegant and modern tabletop water cooler made of luxury inox material. Features dual taps for hot, cold, and room temperature water with an adjustable thermostat and energy-saving switches.',
            gr: 'Κομψός και σύγχρονος επιτραπέζιος ψύκτης νερού από υλικό inox πολυτελείας. Διαθέτει δύο βρύσες για ζεστό, κρύο και νερό θερμοκρασίας δωματίου, με ρυθμιζόμενο θερμοστάτη και διακόπτες εξοικονόμησης ενέργειας.'
        },
        features: {
            en: [
                'Hot, Cold & Room Temperature',
                'Dual tap functionality',
                'Luxury Inox & Black finish',
                'Large capacity stainless steel tank',
                'Independent heating/cooling switches',
                'Adjustable thermostat',
                'Compact ergonomic design'
            ],
            gr: [
                'Ζεστό, Κρύο & Θερμοκρασία Δωματίου',
                'Λειτουργία με δύο βρύσες',
                'Υλικό Inox πολυτελείας & Μαύρο φινίρισμα',
                'Ανοξείδωτος κάδος μεγάλης χωρητικότητας',
                'Ανεξάρτητοι διακόπτες λειτουργίας',
                'Ρυθμιζόμενος θερμοστάτης',
                'Συμπαγής εργονομικός σχεδιασμός'
            ]
        },
        specifications: {
            capacity: '2L Cold / 1L Hot',
            dimensions: '31cm x 34cm x 50cm',
            power: '120W (Cooling) / 420W (Heating)',
            weight: '12 kg',
            certification: 'CE',
            warranty: '1 Year'
        },
        images: [
            'images/yl1674t.png'
        ]
    }
];

// Export for use in other files (Node.js)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = products;
}
