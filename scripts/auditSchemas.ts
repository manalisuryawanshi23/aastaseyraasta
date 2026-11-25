import {
  buildLocalBusinessSchema,
  buildWebSiteSchema,
  buildPoojaServiceSchema,
  buildHowToSchema,
  buildTourSchema,
  buildBlogSchema,
  buildFAQSchema,
  buildBreadcrumbSchema,
} from '../src/utils/seoSchemas';
import { initialSiteSettings, initialPoojas, initialTours, initialBlogPosts } from '../src/data/initialData';

const results: Record<string, any> = {};

// 1. LocalBusiness
const lb = buildLocalBusinessSchema(initialSiteSettings);
results['LocalBusiness'] = {
  type: lb['@type'],
  id: lb['@id'],
  telephone: lb.telephone,
  address: `${lb.address.streetAddress}, ${lb.address.addressLocality}, ${lb.address.addressRegion} - ${lb.address.postalCode}`,
  geo: `${lb.geo.latitude}, ${lb.geo.longitude}`,
  priceRange: lb.priceRange,
  openingHoursCount: lb.openingHoursSpecification?.length,
  contactPointsCount: lb.contactPoint?.length,
  areaServed: lb.areaServed,
  valid: lb['@type'] === 'LocalBusiness' && lb.telephone.includes('9111099799') && lb.address.streetAddress.includes('78 Manipark'),
};

// 2. WebSite
const ws = buildWebSiteSchema();
results['WebSite'] = {
  type: ws['@type'],
  id: ws['@id'],
  publisherId: ws.publisher['@id'],
  searchTarget: ws.potentialAction.target.urlTemplate,
  valid: ws['@type'] === 'WebSite' && ws.publisher['@id'] === lb['@id'],
};

// 3. Pooja Service
const pooja = initialPoojas[0];
const ps = buildPoojaServiceSchema(pooja, initialSiteSettings);
results['PoojaService'] = {
  type: ps['@type'],
  name: ps.name,
  providerType: ps.provider['@type'],
  providerPhone: ps.provider.telephone,
  providerAddress: `${ps.provider.address.streetAddress}, ${ps.provider.address.addressLocality}`,
  offersType: ps.offers['@type'],
  offersPriceRange: `₹${ps.offers.lowPrice} - ₹${ps.offers.highPrice}`,
  offersSeller: ps.offers.seller?.name,
  ratingValue: ps.aggregateRating?.ratingValue,
  reviewCount: ps.aggregateRating?.reviewCount,
  areaServedType: ps.areaServed?.['@type'],
  hasInvalidLocationProperty: 'location' in ps,
  valid: ps['@type'] === 'Service' && !('location' in ps) && ps.provider.telephone.includes('9111099799'),
};

// 4. HowTo
const poojaWithSteps = initialPoojas.find((p) => p.procedureSteps && p.procedureSteps.length > 0) || pooja;
const ht = buildHowToSchema(poojaWithSteps);
results['HowTo'] = {
  type: ht ? ht['@type'] : null,
  name: ht?.name,
  totalTime: ht?.totalTime,
  stepsCount: ht ? ht.step.length : 0,
  allStepsHaveUrls: ht ? ht.step.every((s: any) => s.url && s.url.includes('#step-')) : false,
  allStepsHaveText: ht ? ht.step.every((s: any) => s.name && s.text) : false,
  valid: ht ? ht['@type'] === 'HowTo' && ht.step.every((s: any) => s.url && s.text) : true,
};

// 5. TouristTrip
const tour = initialTours[0];
const ts = buildTourSchema(tour);
results['TouristTrip'] = {
  type: ts['@type'],
  name: ts.name,
  itineraryType: ts.itinerary ? ts.itinerary['@type'] : null,
  itineraryItemsCount: ts.itinerary ? ts.itinerary.itemListElement.length : 0,
  providerType: ts.provider['@type'],
  providerPhone: ts.provider.telephone,
  providerAddress: `${ts.provider.address.streetAddress}, ${ts.provider.address.addressLocality}`,
  offersType: ts.offers['@type'],
  offersSeller: ts.offers.seller?.name,
  hasCityTypeViolation: JSON.stringify(ts).includes('"@type":"City"'),
  valid: ts['@type'] === 'TouristTrip' && ts.itinerary?.['@type'] === 'ItemList' && !JSON.stringify(ts).includes('"@type":"City"'),
};

// 6. BlogPosting
const blog = initialBlogPosts[0];
const bs = buildBlogSchema(blog);
results['BlogPosting'] = {
  type: bs['@type'],
  headline: bs.headline,
  authorType: bs.author['@type'],
  authorName: bs.author.name,
  publisherType: bs.publisher['@type'],
  publisherName: bs.publisher.name,
  hasPublisherLogo: !!bs.publisher.logo?.url,
  hasMainEntityOfPage: !!bs.mainEntityOfPage,
  valid: bs['@type'] === 'BlogPosting' && !!bs.publisher.logo?.url && !!bs.headline,
};

// 7. FAQPage
const sampleFaqs = [
  { question: 'What is the auspicious muhurat?', answer: 'Muhurat is calculated per Vedic panchang.' },
  { question: 'How to reach the temple?', answer: 'The temple is accessible via Ujjain junction.' },
];
const fq = buildFAQSchema(sampleFaqs);
results['FAQPage'] = {
  type: fq['@type'],
  questionCount: fq.mainEntity.length,
  questionType: fq.mainEntity[0]['@type'],
  answerType: fq.mainEntity[0].acceptedAnswer['@type'],
  valid: fq['@type'] === 'FAQPage' && fq.mainEntity[0]['@type'] === 'Question' && fq.mainEntity[0].acceptedAnswer['@type'] === 'Answer',
};

// 8. BreadcrumbList
const sampleBreadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'Pooja Services', url: '/pooja-services' },
  { name: 'Rudrabhishek Pooja', url: '/pooja/rudrabhishek-pooja-ujjain' },
];
const bc = buildBreadcrumbSchema(sampleBreadcrumbs);
results['BreadcrumbList'] = {
  type: bc['@type'],
  itemCount: bc.itemListElement.length,
  allPositionsCorrect: bc.itemListElement.every((item: any, idx: number) => item.position === idx + 1),
  allUrlsAbsolute: bc.itemListElement.every((item: any) => item.item && item.item.startsWith('http')),
  valid: bc['@type'] === 'BreadcrumbList' && bc.itemListElement.every((item: any) => item.item && item.item.startsWith('http')),
};

console.log(JSON.stringify(results, null, 2));
