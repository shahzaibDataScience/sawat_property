import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  PlusCircle, 
  Upload, 
  CheckCircle2, 
  MapPin, 
  Home, 
  DollarSign, 
  ShieldCheck, 
  FileText,
  AlertCircle,
  Eye,
  Trash2
} from 'lucide-react';
import { PropertyListing, PropertyPurpose, PropertyType, AreaUnit } from '../types/property';
import { swatAreas } from '../data/areas';
import { useLanguage } from '../context/LanguageContext';
import { formatPricePKR } from '../utils/propertyUtils';

interface SellPageProps {
  onAddListing: (newProperty: PropertyListing) => void;
  onSelectProperty: (slug: string) => void;
}

export const SellPage: React.FC<SellPageProps> = ({ onAddListing, onSelectProperty }) => {
  const { isUrdu } = useLanguage();

  const [purpose, setPurpose] = useState<PropertyPurpose>('sale');
  const [type, setType] = useState<PropertyType>('house');
  const [areaName, setAreaName] = useState<string>('Mingora');
  const [address, setAddress] = useState<string>('');
  const [price, setPrice] = useState<string>('15000000');
  const [areaValue, setAreaValue] = useState<string>('5');
  const [areaUnit, setAreaUnit] = useState<AreaUnit>('Marla');
  const [beds, setBeds] = useState<number>(3);
  const [baths, setBaths] = useState<number>(3);
  const [parking, setParking] = useState<number>(1);
  const [furnished, setFurnished] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'Electricity 24/7',
    'Clear Registry & Mutation (Intiqal)',
  ]);
  const [sellerName, setSellerName] = useState<string>('');
  const [sellerPhone, setSellerPhone] = useState<string>('');
  const [sellerWhatsApp, setSellerWhatsApp] = useState<string>('');
  const [antiSpamAnswer, setAntiSpamAnswer] = useState<string>('');

  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
  ]);

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [createdListing, setCreatedListing] = useState<PropertyListing | null>(null);

  const availableAmenities = [
    'Electricity 24/7',
    'Sui Gas Installed',
    'Borehole Fresh Water',
    'Mountain / River View',
    'Solar System Backup',
    'Paved Road Access',
    'Car Porch / Garage',
    'Clear Registry & Mutation (Intiqal)',
    'Tourist Hotspot',
    'Near Commercial Center',
  ];

  const toggleAmenity = (item: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(item) ? prev.filter((f) => f !== item) : [...prev, item]
    );
  };

  const handleSimulatedPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setUploadedPhotos((prev) => [...prev, uploadEvent.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Spam verification (4 + 3 = 7)
    if (antiSpamAnswer.trim() !== '7') {
      alert(isUrdu ? 'براہ کرم سپیم تحفظ کا درست جواب دیں (4 + 3 = 7)' : 'Please answer the security check correctly (4 + 3 = 7)');
      return;
    }

    const numericPrice = Number(price) || 5000000;
    const numericArea = Number(areaValue) || 5;

    const generatedSlug = `${numericArea}-${areaUnit.toLowerCase().replace(/\s+/g, '-')}-${type}-in-${areaName.toLowerCase()}-${Date.now().toString().slice(-4)}`;

    const newProperty: PropertyListing = {
      id: `prop-user-${Date.now()}`,
      slug: generatedSlug,
      title: title || `${numericArea} ${areaUnit} ${type.toUpperCase()} in ${areaName}`,
      titleUrdu: `${areaName} میں ${numericArea} ${areaUnit} ${type}`,
      purpose,
      type,
      price: numericPrice,
      priceFormatted: formatPricePKR(numericPrice, purpose),
      areaValue: numericArea,
      areaUnit,
      beds: ['house', 'flat'].includes(type) ? beds : undefined,
      baths: ['house', 'flat'].includes(type) ? baths : undefined,
      parking,
      furnished,
      location: address ? address.split(',')[0] : `Main Road, ${areaName}`,
      areaName,
      address: address || `${areaName}, Swat, KPK`,
      description: description || `Newly listed property in ${areaName}, Swat. Complete legal documentation and direct owner contact available.`,
      descriptionUrdu: `${areaName} سوات میں نئی لسٹنگ۔ قانونی کاغذات مکمل۔`,
      features: selectedFeatures,
      images: uploadedPhotos.length > 0 ? uploadedPhotos : [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
      ],
      contactPhone: sellerPhone || '+923001234567',
      whatsapp: sellerWhatsApp || sellerPhone || '+923001234567',
      postedDate: new Date().toISOString().split('T')[0],
      isFeatured: false,
      coordinates: { lat: 34.7758, lng: 72.3626 },
    };

    onAddListing(newProperty);
    setCreatedListing(newProperty);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // fallback
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{isUrdu ? '100% مفت پراپرٹی لسٹنگ' : 'Free Listing & Direct Verified Buyers'}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-stone-900 tracking-tight">
          {isUrdu ? 'اپنی پراپرٹی سوات میں لسٹ کریں' : 'Sell or Rent Your Property in Swat'}
        </h1>

        <p className="text-stone-500 text-sm max-w-xl mx-auto">
          {isUrdu 
            ? 'مکانات، پلاٹس، زرعی اراضی اور دکانوں کو سوات، پاکستان اور بیرونِ ملک کے ہزاروں خریداروں تک پہنچائیں۔' 
            : 'Broadcast your house, plot, commercial shop, or mountain land to over 50,000 active local and overseas Pakistani buyers.'}
        </p>
      </div>

      {isSubmitted && createdListing ? (
        <div className="bg-white rounded-3xl border border-emerald-200 p-8 sm:p-12 text-center space-y-6 card-shadow animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold font-heading text-stone-900">
              {isUrdu ? 'مبارک ہو! آپ کی پراپرٹی لسٹ ہو گئی ہے' : 'Congratulations! Your Property is Live'}
            </h3>
            <p className="text-stone-600 text-sm max-w-md mx-auto">
              Your property "{createdListing.title}" has been published and is now searchable by buyers and tenants across Swat Property.
            </p>
          </div>

          <div className="p-4 bg-stone-50 rounded-2xl max-w-md mx-auto border border-stone-200 text-left text-xs space-y-1.5">
            <p><span className="font-semibold text-stone-500">Property:</span> {createdListing.title}</p>
            <p><span className="font-semibold text-stone-500">Price:</span> {createdListing.priceFormatted}</p>
            <p><span className="font-semibold text-stone-500">Location:</span> {createdListing.areaName}</p>
            <p><span className="font-semibold text-stone-500">Reference:</span> #{createdListing.id.toUpperCase()}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => onSelectProperty(createdListing.slug)}
              className="px-6 py-3 rounded-xl bg-[#2f5d3a] hover:bg-[#254b2e] text-white font-bold text-sm flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Eye className="w-4 h-4" />
              <span>{isUrdu ? 'اپنی لسٹنگ دیکھیں' : 'View Your Listing Now'}</span>
            </button>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setTitle('');
                setDescription('');
              }}
              className="px-6 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-sm cursor-pointer"
            >
              {isUrdu ? 'دوسری پراپرٹی لسٹ کریں' : 'List Another Property'}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 card-shadow space-y-8">
          {/* Section 1: Purpose & Property Type */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-heading text-stone-900 border-b border-stone-100 pb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#2f5d3a] text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>{isUrdu ? 'مقصد اور پراپرٹی کی نوعیت' : 'Purpose & Property Type'}</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPurpose('sale')}
                className={`py-3 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                  purpose === 'sale'
                    ? 'bg-[#2f5d3a] text-white border-[#2f5d3a] shadow-xs'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-300'
                }`}
              >
                {isUrdu ? 'فروخت کرنی ہے (For Sale)' : 'Sell Property (For Sale)'}
              </button>
              <button
                type="button"
                onClick={() => setPurpose('rent')}
                className={`py-3 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                  purpose === 'rent'
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-300'
                }`}
              >
                {isUrdu ? 'کرایہ پر دینی ہے (For Rent)' : 'Rent Property (For Rent)'}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
              {[
                { val: 'house', label: 'House / Villa' },
                { val: 'plot', label: 'Residential Plot' },
                { val: 'flat', label: 'Flat / Apartment' },
                { val: 'land', label: 'Land / Orchard' },
                { val: 'shop', label: 'Commercial Shop' },
                { val: 'hotel', label: 'Hotel / Resort' },
              ].map((pt) => (
                <button
                  key={pt.val}
                  type="button"
                  onClick={() => setType(pt.val as PropertyType)}
                  className={`py-2 px-3 rounded-lg border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                    type === pt.val
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {pt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Location & Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-heading text-stone-900 border-b border-stone-100 pb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#2f5d3a] text-white text-xs flex items-center justify-center font-bold">2</span>
              <span>{isUrdu ? 'مقام اور پتہ' : 'Location in Swat Valley'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isUrdu ? 'سوات کا علاقہ / تحصیل *' : 'Swat Area / Tehsil *'}
                </label>
                <select
                  value={areaName}
                  onChange={(e) => setAreaName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-800 bg-white outline-none cursor-pointer"
                >
                  {swatAreas.map((a) => (
                    <option key={a.id} value={a.name}>
                      {a.name} ({a.nameUrdu})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isUrdu ? 'مکمل پتہ یا محلہ *' : 'Street Address / Landmark *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Street 4, Makanbagh, Near Swat College"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-800 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Pricing & Area Size */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-heading text-stone-900 border-b border-stone-100 pb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#2f5d3a] text-white text-xs flex items-center justify-center font-bold">3</span>
              <span>{isUrdu ? 'قیمت اور پیمائش' : 'Price & Area Dimensions'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-stone-700 mb-1">
                  <span>{isUrdu ? 'ڈیمانڈ قیمت (PKR) *' : 'Asking Price in PKR *'}</span>
                  <span className="text-[#2f5d3a]">
                    {price ? formatPricePKR(Number(price), purpose) : ''}
                  </span>
                </div>
                <input
                  type="number"
                  required
                  min={1000}
                  step={5000}
                  placeholder="e.g. 15000000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-800 outline-none font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {isUrdu ? 'سائز *' : 'Area Size *'}
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={areaValue}
                    onChange={(e) => setAreaValue(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-800 outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {isUrdu ? 'یونٹ' : 'Unit'}
                  </label>
                  <select
                    value={areaUnit}
                    onChange={(e) => setAreaUnit(e.target.value as AreaUnit)}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-800 bg-white outline-none cursor-pointer"
                  >
                    <option value="Marla">Marla (مرلہ)</option>
                    <option value="Kanal">Kanal (کنال)</option>
                    <option value="Sq. Ft.">Sq. Ft. (مربع فٹ)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Beds, Baths, Parking for residential */}
            {['house', 'flat'].includes(type) && (
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {isUrdu ? 'بیڈ رومز' : 'Bedrooms'}
                  </label>
                  <select
                    value={beds}
                    onChange={(e) => setBeds(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                      <option key={n} value={n}>{n} Bedrooms</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {isUrdu ? 'باتھ رومز' : 'Bathrooms'}
                  </label>
                  <select
                    value={baths}
                    onChange={(e) => setBaths(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>{n} Baths</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {isUrdu ? 'فرنشڈ' : 'Furnished'}
                  </label>
                  <select
                    value={furnished ? 'yes' : 'no'}
                    onChange={(e) => setFurnished(e.target.value === 'yes')}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm bg-white"
                  >
                    <option value="no">Unfurnished</option>
                    <option value="yes">Furnished</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Section 4: Title, Description & Amenities */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-heading text-stone-900 border-b border-stone-100 pb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#2f5d3a] text-white text-xs flex items-center justify-center font-bold">4</span>
              <span>{isUrdu ? 'عنوان و خصوصیات' : 'Listing Title & Amenities'}</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {isUrdu ? 'پراپرٹی کا پرکشش عنوان *' : 'Listing Headline / Title *'}
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 5 Marla Brand New Modern House for Sale in Makanbagh Mingora"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-800 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {isUrdu ? 'تفصیلی تفصیل (سہولیات، راستے، پانی، بجلی) *' : 'Detailed Description *'}
              </label>
              <textarea
                rows={4}
                required
                placeholder="Describe key highlights, floor layout, construction quality, water supply, neighborhood, etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-800 outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-2">
                {isUrdu ? 'سہولیات منتخب کریں' : 'Select Amenities & Highlights'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {availableAmenities.map((amenity) => (
                  <label
                    key={amenity}
                    className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                      selectedFeatures.includes(amenity)
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedFeatures.includes(amenity)}
                      onChange={() => toggleAmenity(amenity)}
                      className="accent-[#2f5d3a]"
                    />
                    <span>{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Section 5: Photos */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-heading text-stone-900 border-b border-stone-100 pb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#2f5d3a] text-white text-xs flex items-center justify-center font-bold">5</span>
              <span>{isUrdu ? 'تصاویر اپ لوڈ کریں' : 'Upload Property Photos'}</span>
            </h3>

            <div className="border-2 border-dashed border-stone-300 rounded-2xl p-6 text-center space-y-3 hover:border-emerald-600 transition-colors">
              <Upload className="w-8 h-8 text-stone-400 mx-auto" />
              <div>
                <p className="text-xs sm:text-sm font-semibold text-stone-700">
                  Drag and drop property photos, or click to upload
                </p>
                <p className="text-[11px] text-stone-400">PNG, JPG, WEBP up to 10MB each</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleSimulatedPhotoUpload}
                className="text-xs text-stone-500 cursor-pointer"
              />
            </div>

            {uploadedPhotos.length > 0 && (
              <div className="flex items-center gap-3 overflow-x-auto py-2">
                {uploadedPhotos.map((photo, i) => (
                  <div key={i} className="relative w-24 h-20 rounded-xl overflow-hidden border border-stone-200 shrink-0 group">
                    <img src={photo} alt={`Uploaded ${i + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setUploadedPhotos((prev) => prev.filter((_, idx) => idx !== i))}
                      className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white hover:bg-red-600 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 6: Seller Contact & Anti-Spam */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-heading text-stone-900 border-b border-stone-100 pb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#2f5d3a] text-white text-xs flex items-center justify-center font-bold">6</span>
              <span>{isUrdu ? 'مالک کا رابطہ و سیکیورٹی چیک' : 'Owner Contact & Security'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isUrdu ? 'آپ کا نام *' : 'Your Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bakhtawar Khan"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isUrdu ? 'موبائل نمبر (کالز کے لیے) *' : 'Mobile Phone Number *'}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+92 300 1234567"
                  value={sellerPhone}
                  onChange={(e) => setSellerPhone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isUrdu ? 'واٹس ایپ نمبر' : 'WhatsApp Number (for direct chat)'}
                </label>
                <input
                  type="tel"
                  placeholder="+92 300 1234567"
                  value={sellerWhatsApp}
                  onChange={(e) => setSellerWhatsApp(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {isUrdu ? 'سیکیورٹی سوال: 4 + 3 کا جواب کیا ہے؟ *' : 'Security Question: What is 4 + 3? *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter 7"
                  value={antiSpamAnswer}
                  onChange={(e) => setAntiSpamAnswer(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm outline-none font-bold"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-4">
            <p className="text-xs text-stone-500">
              By submitting, you confirm you are the legal owner or authorized representative of this property.
            </p>

            <button
              type="submit"
              className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-900 font-extrabold text-sm shadow-md transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              {isUrdu ? 'پراپرٹی شائع کریں' : 'Submit & Publish Listing'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
