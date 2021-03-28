export const getHeaders = () => {
  const spToken = localStorage.getItem('spToken')
  const idpToken = localStorage.getItem('idpToken')
  if (!spToken || !idpToken) return {}
  return {
    Authorization: 'SP ' + localStorage.getItem('spToken') + ',' + 'IDP ' + localStorage.getItem('idpToken')
  }
}

export const CATEGORIES = {
  c01: {
    name: 'Actor',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profile-test.appspot.com/o/assets%2Fcategories%2FActor.jpg?alt=media&token=edf61b49-6f81-4666-8f80-99e9b9b2ded5'
  },
  c02: {
    name: 'Anchor',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fanchor.jpg?alt=media&token=2b7715fe-f760-49a1-a7d7-55986a48bfbb'
  },
  c03: {
    name: 'Artist',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fartist.craft.jpg?alt=media&token=5a8cd5ff-2e79-49d7-9391-30ef83538279'
  },
  c04: {
    name: 'Animator',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Faniamator.jpg?alt=media&token=25321ac9-692c-4654-81a4-6e85be98bd54'
  },
  c05: {
    name: 'Ad Agency',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fadagency.jpg?alt=media&token=996fa7f4-e440-4091-8d59-b05b5bb2b349'
  },
  c06: {
    name: 'Assistant Director',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fassdirector.jpg?alt=media&token=2f038900-5ab8-4f24-8b88-3bd5c1cd7728'
  },
  c07: {
    name: 'Casting Manager',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fcastingmanager.jpg?alt=media&token=ee6b4527-904a-47e2-b9cd-98d3bae4ebd0'
  },
  c08: {
    name: 'Choreographer',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Faction-agility-balance-1701202.jpg?alt=media&token=f1d53d82-9509-4a31-b9f1-62def2b0c37f'
  },
  c09: {
    name: 'Comedian',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fcomic.jpg?alt=media&token=48661873-d12a-48c5-a437-4ce746fcd237'
  },
  c10: {
    name: 'Dancer',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fd.western.jpg?alt=media&token=f9a850bd-d55f-4d8d-a579-14ea9d5d7bef'
  },
  c12: {
    name: 'Director',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2FDirector.jpg?alt=media&token=b0140242-6ef7-4a19-8e46-c64f8aef07d6'
  },
  c13: {
    name: 'Writer',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fwriter.jpg?alt=media&token=1bb78b62-7880-48bd-bed4-b709166a256b'
  },
  c14: {
    name: 'Dubbing Studio',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fdubbing%20studio.jpg?alt=media&token=94126165-fa11-465b-9314-70712e6f547a'
  },
  c15: {
    name: 'Fashion Designer',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fdubbing%20studio.jpg?alt=media&token=94126165-fa11-465b-9314-70712e6f547a'
  },
  c16: {
    name: 'Film Schools',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fdubbing%20studio.jpg?alt=media&token=94126165-fa11-465b-9314-70712e6f547a'
  },
  c17: {
    name: 'Graphic Designer',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fgraphic%20designer.jpg?alt=media&token=d03a3adb-90da-40a8-927e-715b937398af'
  },
  c18: {
    name: 'Journalist',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Flyrics.jpg?alt=media&token=019e0778-df06-4640-bf90-dc32d97f648e'
  },
  c19: {
    name: 'Lyricist',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Flyrics.jpg?alt=media&token=019e0778-df06-4640-bf90-dc32d97f648e'
  },
  c20: {
    name: 'Make Up Artist',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fmake%20up%20artist.jpg?alt=media&token=61c0e2c1-daff-4c33-8d7e-8176a93fb1a4'
  },
  c21: {
    name: 'Model',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fmodel.jpg?alt=media&token=b06f073b-a86f-4b31-bf89-c9adc137e7a1'
  },
  c22: {
    name: 'Music',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fmusic.jpg?alt=media&token=2df79537-8580-41f6-b86c-1571b5f65273'
  },
  c23: {
    name: 'Music Bands',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fm.band.jpg?alt=media&token=042e43ba-1f22-4ca5-ae4a-57615a403feb'
  },
  c24: {
    name: 'Music Production',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fmusic.jpg?alt=media&token=2df79537-8580-41f6-b86c-1571b5f65273'
  },
  c26: {
    name: 'Photographer',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fphotographer.jpg?alt=media&token=796d33fc-e727-4656-840b-c26de2000cce'
  },
  c27: {
    name: 'Producer',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fproducer.jpg?alt=media&token=6e56bd72-c6fa-4af8-9be3-8f3ebb50b959'
  },
  c28: {
    name: 'Production House',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fproduction%20house.jpg?alt=media&token=7e30d0cd-ee18-49f2-8376-2d9c605ab834'
  },
  c29: {
    name: 'Radio Jockey',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fradio%20jocky.jpg?alt=media&token=26d82527-3629-49bd-9def-bc61f073606d'
  },
  c30: {
    name: 'Singer',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fsinger.jpg?alt=media&token=33c2d8f1-e86c-451e-a9b5-8717bed64d5f'
  },
  c31: {
    name: 'Sound Engineer',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fsound%20engineer.jpg?alt=media&token=e167c6ad-bb04-4612-afa5-e67650733cda'
  },
  c32: {
    name: 'Stunts And Fights',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fstuntmaster.jpg?alt=media&token=2394e1a1-8e59-442b-b872-c689fd085a24'
  },
  c33: {
    name: 'Tattoo Artist',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Ftattoo.jpg?alt=media&token=af06c42b-e114-4ea0-b32c-9c30c5d9fb16'
  },
  c34: {
    name: 'Tv Channels',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Ftv.satelite.jpg?alt=media&token=2fcac129-0f8a-440b-b0d9-849acaaf2d0e'
  },
  c36: {
    name: 'Vfx Artist',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fvfx%20artist.jpg?alt=media&token=cadb14f3-9840-4bcf-8ac3-dcfbbfe1d357'
  },
  c37: {
    name: 'Cinematographer',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fdubbing%20studio.jpg?alt=media&token=94126165-fa11-465b-9314-70712e6f547a'
  },
  c38: {
    name: 'Video Editor',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fbroadcast-broadcasting-camcorder-66134.jpg?alt=media&token=a9a7cdee-472c-4a80-b6fd-64c9ae747e56'
  },
  c39: {
    name: 'Director Of Photography ',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fdubbing%20studio.jpg?alt=media&token=94126165-fa11-465b-9314-70712e6f547a'
  },
  c40: {
    name: 'Costume Designer',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fdubbing%20studio.jpg?alt=media&token=94126165-fa11-465b-9314-70712e6f547a'
  },
  c41: {
    name: 'Others',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fdubbing%20studio.jpg?alt=media&token=94126165-fa11-465b-9314-70712e6f547a'
  },
  c42: {
    name: 'Host',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fanchor.jpg?alt=media&token=2b7715fe-f760-49a1-a7d7-55986a48bfbb'
  },
  c43: {
    name: 'Emcee',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/filmy-profiles.appspot.com/o/assets%2Fcategories%2Fanchor.jpg?alt=media&token=2b7715fe-f760-49a1-a7d7-55986a48bfbb'
  }
}

export const CITIES = [
  'New Delhi',
  'Mumbai',
  'Kolkata',
  'Bangalore',
  'Pune',
  'Hyderabad',
  'Chennai',
  'Ahmedabad',
  'Vishakhapatnam',
  'Surat',
  'Jaipur',
  'Kanpur',
  'Lucknow',
  'Nagpur',
  'Ghaziabad',
  'Agartala',
  'Agra',
  'Ahmadnagar',
  'Ahmedabad',
  'Aizawl',
  'Ajmer',
  'Akola',
  'Alappuzha',
  'Aligarh', 'Allahabad',
  'Alwar',
  'Ambala',
  'Amravati',
  'Amritsar',
  'Amroha',
  'Anand',
  'Anantapur',
  'Andaman and Nicobar Islands',
  'Aurangabad',
  'Avadi',
  'Baharampur',
  'Bahraich',
  'Bardhaman',
  'Bareilly',
  'Bathinda',
  'Begusarai',
  'Belgaum',
  'Bellary',
  'Bhagalpur',
  'Bharatpur',
  'Bharuch',
  'Bhavnagar',
  'Bhilwara',
  'Bhind',
  'Bhiwani',
  'Bhopal',
  'Bhubaneswar',
  'Bidar',
  'Bihar Sharif',
  'Bijapur',
  'Bikaner', 'Bilaspur', 'Bokaro', 'Bulandshahr', 'Burhanpur', 'Buxar', 'Chandigarh', 'Chandrapur',
  'Chapra', 'Chittoor', 'Coimbatore', 'Cuttack', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Darbhanga', 'Davanagere', 'Dehradun',
  'Deoghar', 'Dewas', 'Dhanbad', 'Dhule', 'Dibrugarh', 'Dimapur', 'Dindigul', 'Durg', 'East Godavari', 'East Singhbum', 'English Bazar', 'Ernakulam', 'Erode', 'Etawah', 'Faridabad', 'Farrukhabad', 'Fatehpur', 'Firozabad', 'Gandhidham', 'Gandhinagar', 'Gangtok', 'Ganjam', 'Gaya', 'Gorakhpur', 'Gulbarga', 'Guna', 'Guntur', 'Gurgaon', 'Guwahati', 'Gwalior', 'Hajipur', 'Haldia', 'Hapur', 'Haridwar', 'Hisar', 'Hosur', 'Howrah', 'Hubli', 'Imphal', 'Indore', 'Jabalpur', 'Jalalpur', 'Jalandhar', 'Jalgaon', 'Jalna', 'Jalpaiguri', 'Jammu', 'Jamnagar', 'Jaunpur', 'Jhansi', 'Jodhpur', 'Jorhat', 'Junagadh', 'Kadapa', 'Kanchipuram', 'Kannur', 'Kapurthala', 'Karaikudi', 'Karimnagar', 'Karnal', 'Katihar', 'Khammam', 'Khandwa', 'Kishanganj', 'Kolhapur', 'Kollam', 'Korba', 'Kota', 'Kottayam', 'Kozhikode', 'Krishna', 'Kurnool', 'Lakshadweep', 'Latur', 'Ludhiana', 'Madurai', 'Mahesana', 'Malappuram', 'Mangalore', 'Mathura', 'Mau', 'Medinipur West', 'Meerut', 'Miryalaguda', 'Mirzapur', 'Moradabad', 'Morbi', 'Morena', 'Munger', 'Mungershchim Champaran', 'Murwara', 'Muzaffarnagar', 'Muzaffarpur', 'Mysore', 'Nadiad', 'Nagercoil', 'Namakkal', 'Nanded', 'Nashik', 'Navi Mumbai', 'Nellore', 'Nizamabad', 'Noida', 'North 24 Parganas', 'Ongole', 'Orai', 'Palghat', 'Pali', 'Panaji', 'Panchkula', 'Panipat', 'Panvel', 'Parbhani', 'Patiala', 'Patna', 'Pondicherry', 'Purnia', 'Rae Bareli', 'Raichur', 'Raiganj', 'Raipur', 'Rajkot', 'Rajpur Sonarpur', 'Ranchi', 'Ratlam', 'Rewa', 'Rohtak', 'Rohtas', 'Rourkela', 'Saharanpur', 'Saharsa', 'Salem', 'Samastipur', 'Sambalpur', 'Sambhal', 'Satara', 'Satna', 'Serampore', 'Shahjahanpur', 'Shillong', 'Shimla', 'Shivamogga', 'Sikar', 'Silchar', 'Siliguri', 'Singrauli', 'Sirsa', 'Siwan', 'Solapur', 'Sonipat', 'Sri Ganganagar', 'Srikakulam', 'Srinagar', 'Thane', 'Thanjavur', 'Thiruvananthapuram', 'Thoothukudi', 'Thrissur', 'Tiruchirappalli', 'Tirunelveli', 'Tiruppur', 'Tumkur', 'Udupi', 'Ujjain', 'Unnao', 'Vadodara', 'Varanasi', 'Vellore', 'Vijayanagaram', 'Warangal', 'West Godavari', 'Yamunanagar']

export const LANGUAGES = [
  'Assamese', 'Bhojpuri', 'Bengali', 'English', 'Gujarati', 'Hindi', 'Kannada', 'Malayalam', 'Marathi', 'Meitel', 'Odia', 'Punjabi', 'Tamil', 'Telugu', 'Tulu', 'Urdu'
]

export const GENDERS = [
  'Male', 'Female'
]
