// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "cartPage": {
            "title": "Your Cart",
            "emptyMessage": "Your cart is empty",
            "sizeLabel": "Size",
            "priceLabel": "Price",
            "qtyLabel": "Qty",
            "shipping": "Shipping:",
            "freeShipping": "Free Shipping Eligible",
            "subtotal": "Subtotal: ",
            "total": "Total:",
            "proceedToCheckout": "Proceed to Checkout",
            "removeItem": "Remove item"
          },
       
          priceRange: "Price: {{min}} - {{max}} EGP",
          availableSizes: "{{count}} {{count, plural, one {size} other {sizes}}} available",
          darkMode: "Dark Mode",
          productName: "Product Name",
          selectSize: "Select size",
          selectedSize: "Selected Size: {{size}}",
          price: "Price:",
          material: "Material: Canvas",
          addToCart: "Add to cart",
          productDescription: "Product Description",
          highDefinition: "High definition picture printed on canvas with waterproof, fade-resistant, environmentally-friendly inks.",
          forRooms: "This artwork is for living room, bedroom, bathroom, kitchen.",
          professionalStretching: "Stretched and stapled by professionals on solid wood frame.",
          bestQuality: "The best quality canvas for texture and finish, premium inks for vivid color, hand-stretched, great for wall decor.",
          frameThickness: "All our frames come in a 2.8cm thickness, providing a rich appearance on your wall.",
          packaging: "Your paintings will be carefully packaged to ensure they reach you in perfect condition, ready to decorate your home.",
          warmAttention: "Warm Attention",
          colorDifference: "The actual color may be slightly different from the picture.",
          measureWall: "We recommend measuring your wall before purchase.",
          topSellers: "Top Sellers",
          backButton: "Back",
          thumbnailAlt: "Thumbnail {{index}}",
          productNotFound: "Product not found",
          priceLabel: "Price",
          currency: "EGP",
          sizesAvailable: "sizes available",
          welcome: "Welcome to our store",
          product: "Product",
     
          contactUs: "Contact Us",
          nameLabel: "Name",
          emailLabel: "Email",
          commentLabel: "Comment",
          namePlaceholder: "Your Name",
          emailPlaceholder: "Your Email",
          commentPlaceholder: "Your Comment",
          submitButton: "Submit",
          formAlert: "Please fill out all fields.",
          successMessage: "Your message has been sent successfully!",
          errorMessage: "There was an error sending your message. Please try again.",
          home: "Home",
          shop: "Shop",
          cart_empty: "Your cart is empty",
          qty: "Quantity",
   
          total_price: "Total Price",
          view_cart: "View Cart",
          cart_tooltip: "Cart ({{count}}) - Shipping: {{shipping}} EGP",
          title: "Your Cart",
            emptyMessage: "Your cart is empty",
            sizeLabel: "Size",
        
            qtyLabel: "Qty",
            shipping: "Shipping:  ",
            freeShipping: "Free Shipping Eligible",
            subtotal: "Subtotal:  EGP",
            total: "Total:  EGP",
            proceedToCheckout: "Proceed to Checkout",
            removeItem: "Remove item",
            checkout: "Checkout",
            name: "Name",
            phone: "Phone Number",
            email: "Email",
            address1: "Address 1",
            address2: "Address 2",
            city: "City",
            country: "Country",
            comments: "Comments",
            paymentMethod: "Payment Method",
            cashOnDelivery: "Cash on Delivery",
                 
          
       
            placeOrder: "Place Order",
            shippingInfo: "Shipping: {{cost}} EGP (6 business days)",
          
            orderConfirmation: "Order placed successfully!",
            orderError: "There was an error placing your order. Please try again.",
          
         
          
      
            selectPaymentMethod: "Select payment method",
         
            orderNumber: "Order Number: {{orderNumber}}",
            orderDetails: "Order Details",
            errorPlacingOrder: "There was an error placing your order. Please try again.",
            successPlacingOrder: "Order placed successfully!",
            companyName: "Wall Masters",
            copyright: "© {{year}} Wall Masters. All rights reserved.",
            contactInfo: "For Contact Call: +201000544548",
     
            onePiece: "1 piece",
            threePieces: "3 pieces",
            showMore: "Show More",
            theme: "Theme",
            colors: "Colors",
            noOfPieces: "No of pieces",
            resetFilters: "Reset Filters",
            selectedColors: "{{count}} Colors Selected",
          wallFrame: "Wall Frame",
          abstract: "Abstract",            
          
        },
      },
      ar: {
        translation: {
              
          "cartPage": {
        "title": "سلة التسوق",
        "emptyMessage": "سلة التسوق الخاصة بك فارغة",
        "sizeLabel": "المقاس",
        "priceLabel": "السعر",
        "qtyLabel": "الكمية",
        "shipping": "الشحن: ",
        "freeShipping": "مؤهل للشحن المجاني",
        "subtotal": "المجموع الفرعي: ",
        "total": "الإجمالي: ",
        "proceedToCheckout": "الانتقال إلى الدفع",
        "removeItem": "إزالة العنصر"
      },
      abstract: "تجريدي",
          theme: "موضوع",
          wallFrame: "تابلوه حائط",
          colors: "الألوان",
          noOfPieces: "عدد القطع",
          resetFilters: "إعادة تعيين الفلاتر",
          selectedColors: "{{count}} لون مختار",
          onePiece: "قطعة واحدة",
          threePieces: "3 قطع",
          showMore: "عرض المزيد",
          companyName: "وول ماسترز",
          copyright: "© {{year}} وول ماسترز. جميع الحقوق محفوظة.",
          contactInfo: "للتواصل اتصل: 01000544548",
          priceRange: "السعر: {{min}} - {{max}} جنيه",
      availableSizes: "{{count}} {{count, plural, one {حجم} other {أحجام}}} متاحة",
          darkMode: "وضع الظلام",
          productName: "اسم المنتج",
          selectSize: "اختر الحجم",
          selectedSize: "الحجم المحدد: {{size}}",
          price: "السعر:",
          material: "الخامه: قماش",
          addToCart: "أضف إلى السلة",
          productDescription: "وصف المنتج",
          highDefinition: "صورة عالية الدقة مطبوعة على قماش بألوان مقاومة للماء، ومضادة للتلاشي، وصديقة للبيئة.",
          forRooms: "هذه اللوحة تناسب غرفة المعيشة، غرفة النوم، الحمام، المطبخ.",
          professionalStretching: "مشدود ومثبت بواسطة محترفين على إطار خشبي صلب.",
          bestQuality: "أفضل جودة قماش للحصول على قوام نهائي، ألوان زاهية، ومشدود يدويًا، رائع لتزيين الجدران.",
          frameThickness: "جميع إطاراتنا تأتي بسمك 2.8 سم، مما يوفر مظهرًا غنيًا على جدرانك.",
          packaging: "سيتم تعبئة اللوحات بعناية لضمان وصولها إليك في حالة ممتازة، جاهزة لتزيين منزلك.",
          warmAttention: "تنبيه ",
          colorDifference: "قد يختلف اللون الفعلي قليلاً عن الصورة.",
          measureWall: "نوصي بقياس جدارك قبل الشراء.",
          topSellers: "الأكثر مبيعًا",
          backButton: "عودة",
          thumbnailAlt: "صورة مصغرة {{index}}",
          productNotFound: "المنتج غير موجود",
          checkout: "الدفع",
          name: "الاسم",
          phone: "رقم الهاتف",
          email: "البريد الإلكتروني",
          address1: "العنوان 1",
          address2: "العنوان 2",
          city: "المدينة",
          country: "البلد",
          comments: "تعليقات",
          paymentMethod: "طريقة الدفع",
          cashOnDelivery: "الدفع عند الاستلام",
          subtotal: "المجموع الفرعي",
          shipping: "الشحن",
          total: "الإجمالي",
          sizesAvailable: "الأحجام المتاحة",
          placeOrder: "تأكيد الطلب",
          shippingInfo: "الشحن: {{cost}} جنيه مصري (6 أيام عمل)",
          freeShipping: "الشحن مجاني",
          orderConfirmation: "تم تقديم الطلب بنجاح!",
          orderError: "حدث خطأ أثناء تقديم الطلب. يرجى المحاولة مرة أخرى.",
       
            priceLabel: "السعر",
            currency: "جنيه مصري",
     
          title: "الدفع",
      
          selectPaymentMethod: "اختر طريقة الدفع",
         
          orderNumber: "رقم الطلب: {{orderNumber}}",
          orderDetails: "تفاصيل الطلب",
          errorPlacingOrder: "حدث خطأ أثناء تقديم طلبك. يرجى المحاولة مرة أخرى.",
          successPlacingOrder: "تم تقديم الطلب بنجاح!",
          welcome: "مرحباً بك في متجرنا",
          product: "منتج",
        
          contactUs: "اتصل بنا",
          nameLabel: "الاسم",
          emailLabel: "البريد الإلكتروني",
          commentLabel: "التعليق",
          namePlaceholder: "اسمك",
          emailPlaceholder: "بريدك الإلكتروني",
          commentPlaceholder: "تعليقك",
          submitButton: "إرسال",
          formAlert: "يرجى ملء جميع الحقول.",
          successMessage: "تم إرسال رسالتك بنجاح!",
          errorMessage: "حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى.",
          home: "الرئيسية",
          shop: "التسوق",
          cart_empty: "سلة التسوق فارغة",
          qty: "الكمية",
         
          total_price: "إجمالي السعر",
          view_cart: "عرض السلة",
          cart_tooltip: "السلة ({{count}}) - الشحن: {{shipping}} EGP",
          
     
     
          emptyMessage: "سلة التسوق الخاصة بك فارغة",
          sizeLabel: "المقاس",
         
          qtyLabel: "الكمية",
         
  
 
       
          proceedToCheckout: "الانتقال إلى الدفع",
          removeItem: "إزالة العنصر",
        },
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
