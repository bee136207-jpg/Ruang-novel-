import { Novel } from '../types/novel';

export const INITIAL_NOVELS: Novel[] = [
  // ==========================================
  // BERKAS 1: FILE LAMA (10 Naskah Koleksi Arsip & Klasik)
  // ==========================================
  {
    id: 'novel-lama-1',
    title: 'Pelayaran Bahtera di Laut Bergelora',
    author: 'Amir Sutomo',
    fileType: 'file_lama',
    archiveBadge: 'Arsip Batavia 1937 · Edisi Pusaka',
    yearPublished: '1937',
    genre: 'Klasik & Petualangan',
    coverImage: '/src/assets/images/cover_tenggelamnya_kapal_1793874609244.jpg',
    coverColor: '#3a2618',
    spineTextColor: '#f6d89e',
    synopsis: 'Sebuah roman sejarah maritim yang merekam keteguhan awak kapal schooner Nusantara menerjang gelombang Selat Sunda dan perseteruan pelaut di perbatasan Batavia. Menyingkap persahabatan, kehormatan, dan surat-surat cinta rahasia yang tersimpan di dalam peti jati sang nakhoda tua.',
    rating: 4.9,
    pageCount: 384,
    isBookmarked: true,
    status: 'Sedang Dibaca',
    readingProgress: {
      currentChapterIndex: 0,
      scrollPercent: 35,
      lastReadAt: 'Kemarin, 21:15'
    },
    tags: ['Sastra Klasik', 'Maritim', 'Arsip Hindia Belanda', 'Roman Sejarah'],
    dateAdded: '2024-01-12',
    notes: [
      {
        id: 'n-1',
        chapterIndex: 0,
        chapterTitle: 'Bab 1: Menatap Layar yang Mengembang di Pelabuhan Sunda Kelapa',
        quote: 'Bukan lautan yang menaklukkan kita, melainkan keraguan di dalam dada sebelum kemudi diputar.',
        text: 'Kutipan yang sangat mendalam dari Nakhoda Soegondo.',
        createdAt: '2024-03-10'
      }
    ],
    chapters: [
      {
        id: 'c-1-1',
        chapterNumber: 1,
        title: 'Bab 1: Menatap Layar yang Mengembang di Pelabuhan Sunda Kelapa',
        wordsCount: 940,
        content: [
          'Kabut tipis beraroma garam dan getah pinus masih menggantung di atas tiang-tiang layar kayu jati ketika lonceng pelabuhan berdentang tujuh kali. Di dermaga kayu yang telah lapuk dimakan tiram, para kuli panggul berbaris memikul karung-karung pala dan lada hitam dari pedalaman.',
          'Nakhoda Soegondo berdiri tegak di haluan kapal layar "Mustika Samudera". Matanya yang tajam telah menyaksikan ratusan pasang surut air laut dan berbagai intrik di bandar-bandar pesisir. Di tangannya, sehelai peta bertanggal 1898 dari kantor syahbandar digenggam erat.',
          '"Angin musim barat sudah mulai berhembus kencang, Jurumudi," ujar Soegondo tanpa menoleh. "Bila kita tidak melepaskan tali temali sebelum fajar meninggi, gelombang Selat Karimata akan menutup pintu bagi kita hingga purnama berikutnya."',
          'Di belakangnya, seorang pemuda bernama Hardianto termenung menatap daratan yang perlahan akan ditinggalkannya. Surat lipat empat bertinta ungu dari tunangannya di Buitenzorg tersimpan aman di saku rompinya. Ia tahu pelayaran ini bukan sekadar niaga; ada rahasia diplomatik yang harus diselamatkan ke Pulau Ternate sebelum patroli kapal besi Hindia mencium jejak mereka.',
          'Suara derit katrol kayu beradu dengan perintah para kelasi memecah kesunyian fajar. "Tarik jangkar utama! Kembangkan layar cucur!" teriak mandor dek. Dengan perlahan namun pasti, bahtera tua itu membelah ombak keperakan menuju samudera yang tak bertepi.'
        ]
      },
      {
        id: 'c-1-2',
        chapterNumber: 2,
        title: 'Bab 2: Badai Hitam di Palung Krakatau',
        wordsCount: 1120,
        content: [
          'Malam ketiga membawa tanda-tanda yang mencemaskan para tetua pelaut. Langit yang semula dipenuhi taburan gemintang mendadak pekat bagai jelaga yang ditumpahkan ke atas kubah angkasa. Udara menjadi dingin menggigit, dan burung-burung camar laut terbang terburu-buru mencari tebing karang.',
          '"Turunkan layar agung! Rapatkan tambang ke geladak!" seru Nakhoda Soegondo di tengah gemuruh angin yang mulai menderu liar. Hardianto bergegas membantu kelasi mengikat peti-peti muatan.',
          'Tiba-tiba ombak setinggi dua depa menghantam lambung kiri kapal. Seluruh lambung meratap bagai kayu yang nyaris retak. Air laut menyiram lantai geladak hingga setinggi lutut, membasahi wajah para pelaut yang berjuang melawan kegelapan malam.',
          'Di tengah kekacauan, Hardianto melihat peti besi sang nakhoda bergeser nyaris terjun ke laut. Dengan melompat tanpa memedulikan keselamatan dirinya, pemuda itu menahan peti tersebut dengan punggungnya. Nakhoda Soegondo menatapnya lekat di sela kilatan petir; rasa hormat yang mendalam terpatri di antara dua generasi pelaut.',
          'Ketika fajar merekah, badai telah berlalu meninggalkan pelangi pucat di ufuk barat. Pulau Panaitan menyambut mereka dengan pelukan ombak yang tenang.'
        ]
      },
      {
        id: 'c-1-3',
        chapterNumber: 3,
        title: 'Bab 3: Surat Rahasia di Bawah Sinar Rembulan',
        wordsCount: 980,
        content: [
          'Bahtera Mustika Samudera berlabuh di teluk tersembunyi untuk memperbaiki tiang layar penopang yang retak. Hawa malam di pantai berpasir putih itu begitu damai, kontras dengan kengerian badai yang baru saja mereka lalui.',
          'Nakhoda Soegondo mengundang Hardianto ke kabinnya. Di atas meja jati bertatahkan kuningan, sebuah lentera minyak tanah bergoyang pelan seirama ayunan ombak.',
          '"Kau telah menyelamatkan peti ini, Hardianto," ucap Soegondo seraya menyodorkan cangkir teh rempah hangat. "Di dalamnya bukan sekadar emas atau perhiasan saudagar. Ada naskah perjanjian rahasia para raja nusantara untuk menegakkan kedaulatan bangsa."',
          'Hardianto tertegun. Ia menyadari bahwa pelayaran ini mengemban takdir yang jauh lebih besar daripada impian pribadinya. Matanya menyala dengan tekad baru saat menatap gugusan bintang Pari di langit selatan.'
        ]
      },
      {
        id: 'c-1-4',
        chapterNumber: 4,
        title: 'Bab 4: Gerbang Ternate dan Pelabuhan Pengharapan',
        wordsCount: 1040,
        content: [
          'Pagi hari di minggu keempat pelayaran, Gunung Gamalama menjulang anggun menyapa pandangan para awak kapal. Bau harum cengkih dan pala terbawa angin lepas pantai, menyambut kedatangan Mustika Samudera yang telah letih mengarungi badai.',
          'Perahu-perahu kora-kora bertonggak hiasan bulu cenderawasih meluncur cepat menyongsong bahtera. Para utusan kesultanan melambaikan selendang kuning sebagai tanda persahabatan sejati.',
          'Nakhoda Soegondo menepuk bahu Hardianto erat. "Tugas kita telah tuntas di pelabuhan ini, anak muda. Namun bagi generasimu, ombak kehidupan yang sesungguhnya baru saja dimulai."',
          'Dengan penuh khidmat, peti pusaka diserahkan kepada utusan istana, memastikan perjanjian persaudaraan antar-pulau tetap kokoh terjaga dari generasi ke generasi.'
        ]
      }
    ]
  },
  {
    id: 'novel-lama-2',
    title: 'Jejak Sunyi di Kota Batavia',
    author: 'Eliza van der Veer & R.M. Soeripto',
    fileType: 'file_lama',
    archiveBadge: 'Arsip Manuskrip 1912 · Koleksi Klasik',
    yearPublished: '1912',
    genre: 'Klasik & Misteri Sejarah',
    coverImage: '/src/assets/images/cover_jejak_langkah_klasik_1793874609596.jpg',
    coverColor: '#4a3b2c',
    spineTextColor: '#eedbb0',
    synopsis: 'Penyelidikan detektif partikelir pertama di Hindia Belanda tahun 1912. Di antara jembatan gantung Kota Intan, kanal berair tenang, dan derak kereta kuda malam hari, tersembunyi misteri hilangnya arsip perbendaharaan VOC dan pembunuhan saudagar berlian.',
    rating: 4.8,
    pageCount: 310,
    isBookmarked: false,
    status: 'Belum Dibaca',
    readingProgress: {
      currentChapterIndex: 0,
      scrollPercent: 0
    },
    tags: ['Detektif', 'Batavia Tempo Doeloe', 'Koleksi Arsip'],
    dateAdded: '2023-11-20',
    notes: [],
    chapters: [
      {
        id: 'c-2-1',
        chapterNumber: 1,
        title: 'Bab 1: Dentang Lonceng di Balai Kota Stadhuis',
        wordsCount: 880,
        content: [
          'Malam tanggal 14 Oktober 1912 menyelimuti Oud Batavia dengan kabut pengap dari Kali Ciliwung. Kereta kuda bersayap dua melaju pelan di atas jalan berbatu Kali Besar Barat, menyisakan suara tapak besi yang memantul di dinding gedung-gedung gudang beratap tinggi.',
          'Meneer Raden Mas Soeripto mengetuk pipa tembakaunya ke dinding kereta. Ia menatap mansion megah milik Tuan Pieter van Daalen yang kini dipenuhi oleh polisi seragam biru tua dan lentera karbit.',
          '"Tuan Pieter ditemukan tergeletak di ruang kerjanya yang terkunci rapat dari dalam, Raden Mas," lapor Opsir Willem dengan wajah pucat. Brankas dinding berisi cetak biru kanal rahasia dan berlian Borneo raib tanpa jejak sama sekali.',
          'Soeripto melangkah masuk, mengamati debu di lantai ubin terakota. Di sudut karpet Belgia, ia menemukan sebutir manik-manik giok hijau yang harum cendana—sebuah petunjuk yang tidak lazim di kediaman saudagar Belanda.'
        ]
      },
      {
        id: 'c-2-2',
        chapterNumber: 2,
        title: 'Bab 2: Bayang-Bayang di Kanal Glodok',
        wordsCount: 930,
        content: [
          'Penyelidikan membawa Soeripto menyusuri gang-gang sempit Glodok di mana lampion merah masih berpendar temaram. Toko obat sinshe tua di tepi kanal menjadi sasaran pertanyaannya.',
          'Sinshe Lau mengamati manik-manik giok dengan kacamata berbingkai kuningan. "Ini bukan giok sembarangan, Tuan Opsir. Ini adalah tanda keanggotaan Serikat Naga Merah yang menghilang dua puluh tahun silam."',
          'Tepat saat Sinshe hendak membuka buku catatan pelanggannya, bayangan hitam melesat di atap genteng sirap, menjatuhkan guci keramik yang pecah berantakan di lantai. Soeripto segera mencabut pistol Browning dari saku mantelnya.'
        ]
      },
      {
        id: 'c-2-3',
        chapterNumber: 3,
        title: 'Bab 3: Rahasia di Bawah Jembatan Kota Intan',
        wordsCount: 960,
        content: [
          'Di bawah kolong Jembatan Kota Intan yang bergaya Belanda kuno, perahu sampan kecil terikat di tiang pancang. Air kali yang keruh memantulkan temaram lentera minyak.',
          'Soeripto memergoki sosok berkerudung yang tengah bersiap memindahkan peti kayu jati berukir. Di balik penyamaran itu, terungkaplah identitas sang asisten notaris yang selama ini dipercaya keluarga Van Daalen.',
          '"Kau tidak mengerti, Soeripto!" teriak pria itu dengan putus asa. "Arsip ini membuktikan bahwa tanah leluhur rakyat jelata dirampas dengan dokumen palsu!"',
          'Soeripto terdiam sesaat di hadapan kebenaran moral yang jauh lebih rumit daripada sekadar pasal-pasal hukum kolonial.'
        ]
      }
    ]
  },
  {
    id: 'novel-lama-3',
    title: 'Kutukan Pusaka Sanghyang Sri',
    author: 'Ki Patih Danureja',
    fileType: 'file_lama',
    archiveBadge: 'Naskah Keraton 1948 · Sastra Tradisi',
    yearPublished: '1948',
    genre: 'Klasik & Cerita Rakyat',
    coverImage: '',
    coverColor: '#2b1b17',
    spineTextColor: '#e2c58e',
    synopsis: 'Kisah legendaris mengenai sebilah keris warisan leluhur di lereng Gunung Lawu yang hanya mau dipegang oleh pemimpin berjiwa tulus tanpa pamrih saat perang suksesi kerajaan Mataram berkecamuk.',
    rating: 4.7,
    pageCount: 260,
    isBookmarked: false,
    status: 'Selesai',
    readingProgress: {
      currentChapterIndex: 0,
      scrollPercent: 100,
      lastReadAt: 'Minggu lalu'
    },
    tags: ['Legenda Nusantara', 'Keris Pusaka', 'Sastra Tradisi'],
    dateAdded: '2023-09-05',
    notes: [],
    chapters: [
      {
        id: 'c-3-1',
        chapterNumber: 1,
        title: 'Bab 1: Asap Kemenyan di Kaki Gunung Lawu',
        wordsCount: 820,
        content: [
          'Di sebuah padepokan tua di lereng Lawu yang dingin berangin, bara arang kayu jati masih membara di perapian Empu Brojogati. Pria bertubuh liat dengan rambut memutih itu mengamati pamor keris luk tujuh yang baru saja dicelup ke dalam air kembang tujuh rupa.',
          '"Keris ini diberi nama Sanghyang Sri," tutur Empu Brojogati kepada murid bungsunya, Danang Sutawijaya. "Pamornya bukan untuk meneteskan darah musuh, melainkan sebagai penolak pagebluk dan penenteram jiwa yang murka."',
          'Namun di lembah bawah, suara genderang perang adipati seberang mulai terdengar mendekat, menandakan masa damai telah berakhir.'
        ]
      },
      {
        id: 'c-3-2',
        chapterNumber: 2,
        title: 'Bab 2: Ujian Keteguhan Hati di Puncak Argodumilah',
        wordsCount: 870,
        content: [
          'Danang mendaki jalan setapak berbatu menuju Puncak Argodumilah sambil memeluk keris pusaka yang dibungkus kain cinde jingga. Angin kencang menderu di antara pohon-pohon cemara gunung.',
          'Di hadapannya muncul bayangan ujian: godaan tahta dan kekayaan tanpa batas yang ditawarkan oleh siluman penunggu jurang. Danang memejamkan mata dan merapalkan doa ketulusan yang diajarkan sang guru.',
          'Saat matanya dibuka kembali, bilah keris memancarkan pendaran keemasan hangat yang melenyapkan seluruh kabut kelam di sekitarnya.'
        ]
      },
      {
        id: 'c-3-3',
        chapterNumber: 3,
        title: 'Bab 3: Kembalinya Kedamaian di Tanah Perdikan',
        wordsCount: 910,
        content: [
          'Dengan keris Sanghyang Sri terhunus lembut di tangannya, Danang melangkah ke tengah-tengah pasukan yang siap saling menghunus pedang. Aura kedamaian memancar dari pamor keris, meluluhkan niat perang para prajurit.',
          'Sang Adipati menurunkan senjatanya dan bersujud memohon ampunan atas keserakahannya. Keris pusaka itu kemudian ditancapkan di atas batu prasasti desa, menjadi simbol abadi kerukunan antarsesama saudara.'
        ]
      }
    ]
  },
  {
    id: 'novel-lama-4',
    title: 'Surat-Surat dari Balik Tirai Jati',
    author: 'Siti Wardhani',
    fileType: 'file_lama',
    archiveBadge: 'Sastra Feminis Awal 1928 · Koleksi Langka',
    yearPublished: '1928',
    genre: 'Klasik & Romansa Sastra',
    coverImage: '',
    coverColor: '#3d1d28',
    spineTextColor: '#f8d7da',
    synopsis: 'Kompilasi surat-surat intim dan refleksi kritis seorang gadis ningrat di Jepara yang memperjuangkan hak belajar dan martabat kaum perempuan bumiputra di awal abad ke-20.',
    rating: 4.9,
    pageCount: 220,
    isBookmarked: true,
    status: 'Belum Dibaca',
    readingProgress: {
      currentChapterIndex: 0,
      scrollPercent: 0
    },
    tags: ['Emansipasi', 'Surat Sastra', 'Arsip Sejarah'],
    dateAdded: '2024-02-01',
    notes: [],
    chapters: [
      {
        id: 'c-4-1',
        chapterNumber: 1,
        title: 'Bab 1: Surat Pertama kepada Sahabat di Negeri Seberang',
        wordsCount: 880,
        content: [
          'Jepara, 12 Mei 1928. Sahabatku Stella yang terkasih di Amsterdam, dari balik tirai ukiran kayu jati di serambi timur rumah kadipaten ini, aku memandangi barisan pohon randu yang mulai merontokkan kapas putihnya.',
          'Pikiran manusia yang telah mencicipi cahaya ilmu pengetahuan tak akan pernah bisa dipenjara kembali ke dalam gulita.',
          'Ayahandaku masih menghendaki aku menuruti tradisi pingitan, namun setiap malam di bawah nyala pelita, aku mengajar gadis-gadis anak kusir dan juru masak membaca aksara Latin.'
        ]
      },
      {
        id: 'c-4-2',
        chapterNumber: 2,
        title: 'Bab 2: Lentera Kecil di Bilik Belakang',
        wordsCount: 890,
        content: [
          'Jepara, 24 Agustus 1928. Ruang belakang pendopo kini bukan lagi sekadar tempat menyimpan padi dan alat tenun. Dua belas anak perempuan duduk melingkar di atas tikar pandan.',
          'Melihat binar mata mereka saat pertama kali bisa mengeja kata "MERDEKA" di atas papan tulis batu membuat seluruh lelah dan ketakutan akan teguran para tetua lenyap seketika.',
          'Pendidikan bukanlah hak istimewa kaum ningrat; pendidikan adalah napas bagi jiwa yang hendak bertumbuh.'
        ]
      },
      {
        id: 'c-4-3',
        chapterNumber: 3,
        title: 'Bab 3: Angin Pembaharuan yang Tak Terbendung',
        wordsCount: 920,
        content: [
          'Jepara, 10 November 1928. Kabar tentang sekolah rintisan kami akhirnya sampai ke telinga residen Semarang. Sebagian pejabat menolak, tetapi para ibu di desa-desa sekitar berbondong-bondong mengantarkan putrinya.',
          'Tirai jati yang dulu mengurungku kini telah tersibak. Langkah kecil kami telah menjadi sungai keberanian yang tak akan pernah bisa dibendung lagi oleh prasangka zaman.'
        ]
      }
    ]
  },
  {
    id: 'novel-lama-5',
    title: 'Gita Asmara di Tepi Sungai Brantas',
    author: 'Sutan Marah Rusli',
    fileType: 'file_lama',
    archiveBadge: 'Balai Pustaka 1922 · Roman Klasik',
    yearPublished: '1922',
    genre: 'Klasik & Romansa Sastra',
    coverImage: '',
    coverColor: '#362214',
    spineTextColor: '#fde68a',
    synopsis: 'Tragedi asmara antara dua insan terpelajar di Kediri yang terbentur tembok tebal adat keningratan kaku dan perjodohan politik perkebunan tebu pada masa Hindia Belanda.',
    rating: 4.8,
    pageCount: 295,
    isBookmarked: false,
    status: 'Belum Dibaca',
    readingProgress: { currentChapterIndex: 0, scrollPercent: 0 },
    tags: ['Roman Balai Pustaka', 'Adat & Cinta', 'Sungai Brantas'],
    dateAdded: '2023-08-14',
    notes: [],
    chapters: [
      {
        id: 'c-5-1',
        chapterNumber: 1,
        title: 'Bab 1: Riak Air dan Daun Teratai di Tepi Brantas',
        wordsCount: 810,
        content: [
          'Di tepi Sungai Brantas yang tenang kala senja, perahu getek mengangkut hasil kebun tebu menuju pabrik gula PG Ngadirejo. Rian duduk di atas tanggul batu sambil memetik dawai kecapi.',
          'Dari kejauhan, kereta kuda beratap beludru hijau milik keluarga bupati melintas pelan. Di balik jendela kaca patri, sepasang mata jelita menatapnya dengan kerinduan yang tertahan oleh pagar kasta.'
        ]
      },
      {
        id: 'c-5-2',
        chapterNumber: 2,
        title: 'Bab 2: Janji Rahasia di Bawah Beringin Kembar',
        wordsCount: 860,
        content: [
          'Malam purnama menyinari alun-alun kota Kediri yang sunyi. Di bawah bayangan beringin kembar, Rian dan Kusuma Dewi bertemu sekejap demi bertukar janji setia.',
          '"Bila pun ayahanda hendak menjodohkanku dengan Tuan Administratur, jiwaku telah tertambat selamanya pada kidung asmaramu di tepi Brantas," bisik Dewi seraya menyerahkan selendang sutra bersulam melati.'
        ]
      },
      {
        id: 'c-5-3',
        chapterNumber: 3,
        title: 'Bab 3: Sungai yang Mengalir Menuju Keabadian',
        wordsCount: 900,
        content: [
          'Tekanan keluarga bangsawan tak menyurutkan cinta mereka, meskipun rintangan duniawi memisahkan raga. Rian menuliskan kidung asmara terindahnya yang kelak dinyanyikan oleh para biduan di sepanjang aliran Sungai Brantas.',
          'Cinta yang sejati tidak diukur oleh kepemilikan di dunia fana, melainkan oleh kemurnian jiwa yang tak pernah padam ditelan waktu.'
        ]
      }
    ]
  },
  {
    id: 'novel-lama-6',
    title: 'Pemberontakan Mandor Kopi Priangan',
    author: 'K.H. Hasan Mustapa',
    fileType: 'file_lama',
    archiveBadge: 'Naskah Sunda Kuno 1899 · Sejarah Perlawanan',
    yearPublished: '1899',
    genre: 'Klasik & Sejarah Perjuangan',
    coverImage: '',
    coverColor: '#251b14',
    spineTextColor: '#fed7aa',
    synopsis: 'Dokumentasi naratif tentang perlawanan bawah tanah para petani kopi di perbukitan Gunung Papandayan menentang sistem tanam paksa Preangerstelsel yang menindas rakyat jelata.',
    rating: 4.9,
    pageCount: 340,
    isBookmarked: false,
    status: 'Belum Dibaca',
    readingProgress: { currentChapterIndex: 0, scrollPercent: 0 },
    tags: ['Priangan', 'Tanam Paksa', 'Sejarah Kolonial'],
    dateAdded: '2023-10-10',
    notes: [],
    chapters: [
      {
        id: 'c-6-1',
        chapterNumber: 1,
        title: 'Bab 1: Panen Merah Berdarah di Lereng Papandayan',
        wordsCount: 830,
        content: [
          'Aroma biji kopi arabika yang memerah memenuhi perkebunan Cikajang. Namun di balik keindahan bukit-bukit hijau berkabut itu, cambuk para mandor kompeni terus mendera punggung-punggung petani yang kelaparan.',
          'Ki Sanusi menatap tetesan keringat saudaranya yang jatuh membasahi tanah subur Pasundan. Di dalam hatinya, benih perlawanan mulai bertunas subur bagai belukar di musim penghujan.'
        ]
      },
      {
        id: 'c-6-2',
        chapterNumber: 2,
        title: 'Bab 2: Musyawarah di Goa Kawah Mati',
        wordsCount: 880,
        content: [
          'Tengah malam, tiga puluh perwakilan petani berkumpul di dalam ceruk goa dekat kawah belerang Papandayan. Api unggun kecil dari ranting kayu manis menerangi wajah-wajah penuh tekad.',
          '"Kita tidak boleh terus menyerahkan darah dan keringat kita sementara anak-anak kita memakan ubi busuk," seru Ki Sanusi sambil mengangkat cangkul dan golok pusaka.',
          'Malam itu, mereka berikrar sumpah setia untuk menghentikan pasokan kopi ke gudang kolonial sampai upah yang adil diberikan.'
        ]
      },
      {
        id: 'c-6-3',
        chapterNumber: 3,
        title: 'Bab 3: Fajar Baru Petani Pasundan',
        wordsCount: 920,
        content: [
          'Aksi mogok serentak melumpuhkan seluruh jalur pengiriman kopi dari Garut hingga pelabuhan Batavia. Menghadapi kerugian jutaan gulden, pemerintah kolonial terpaksa duduk berunding dan menghapus aturan kerja paksa yang paling kejam.',
          'Ki Sanusi tersenyum menatap fajar yang merekah di atas Gunung Papandayan; martabat rakyat jelata akhirnya berhasil ditegakkan.'
        ]
      }
    ]
  },
  {
    id: 'novel-lama-7',
    title: 'Cincin Delima Puteri Melayu',
    author: 'Raja Ali Haji',
    fileType: 'file_lama',
    archiveBadge: 'Sastra Riau-Lingga 1875 · Manuskrip Kerajaan',
    yearPublished: '1875',
    genre: 'Klasik & Cerita Rakyat',
    coverImage: '',
    coverColor: '#2b1a29',
    spineTextColor: '#f5d0fe',
    synopsis: 'Syair dan kisah hikayat tentang intrik takhta dan cincin delima merah sakti di Kesultanan Riau-Lingga yang menjadi wasiat kerukunan antarkerabat istana di Selat Malaka.',
    rating: 4.6,
    pageCount: 210,
    isBookmarked: false,
    status: 'Belum Dibaca',
    readingProgress: { currentChapterIndex: 0, scrollPercent: 0 },
    tags: ['Hikayat Melayu', 'Riau Lingga', 'Manuskrip'],
    dateAdded: '2023-07-29',
    notes: [],
    chapters: [
      {
        id: 'c-7-1',
        chapterNumber: 1,
        title: 'Bab 1: Kilau Permata di Istana Damnah Daik',
        wordsCount: 760,
        content: [
          'Angin laut dari Selat Singapura bertiup semilir menggoyangkan tirai beludru kuning istana Sultan di Daik Lingga. Tengku Safura memandangi cincin delima peninggalan ibundanya.',
          'Permata delima itu bukan sekadar perhiasan ratu; ia menyimpan rahasia peta pulau harta karun yang dikubur pahlawan Hang Tuah berabad-abad lampau.'
        ]
      },
      {
        id: 'c-7-2',
        chapterNumber: 2,
        title: 'Bab 2: Pelayaran Rahasia Melintasi Karang Hantu',
        wordsCount: 820,
        content: [
          'Dengan perahu lancang kuning berlambang naga, rombongan Tengku Safura menembus gugusan karang berbahaya di malam tanpa bintang.',
          'Keberanian dan kebijaksanaan sang puteri berhasil memandu para jurumudi melewati pusaran air raksasa hingga tiba di pulau tak bertuan.'
        ]
      },
      {
        id: 'c-7-3',
        chapterNumber: 3,
        title: 'Bab 3: Harta Karun Kebijaksanaan Leluhur',
        wordsCount: 850,
        content: [
          'Di dalam goa batu karang, peti pusaka Hang Tuah dibuka. Harta yang tersimpan bukanlah emas batangan, melainkan kitab hukum adat dan falsafah persatuan bangsa Melayu.',
          'Tengku Safura membawa pulang pusaka tersebut untuk membimbing generasi muda hidup berbudi luhur dan rukun bersaudara.'
        ]
      }
    ]
  },
  {
    id: 'novel-lama-8',
    title: 'Hantu di Balik Lonceng Gereja Blenduk',
    author: 'C. Lekkerkerker',
    fileType: 'file_lama',
    archiveBadge: 'Misteri Semarang 1908 · Arsip Kota Tua',
    yearPublished: '1908',
    genre: 'Klasik & Misteri Sejarah',
    coverImage: '',
    coverColor: '#1c2826',
    spineTextColor: '#99f6e4',
    synopsis: 'Misteri lonceng tembaga Gereja Blenduk Semarang yang berdentang sendiri setiap tengah malam tanpa ada penjaga, menguak rahasia hilangnya harta karun saudagar rempah di Kota Lama.',
    rating: 4.7,
    pageCount: 275,
    isBookmarked: false,
    status: 'Belum Dibaca',
    readingProgress: { currentChapterIndex: 0, scrollPercent: 0 },
    tags: ['Kota Lama Semarang', 'Gereja Blenduk', 'Misteri Klasik'],
    dateAdded: '2023-12-01',
    notes: [],
    chapters: [
      {
        id: 'c-8-1',
        chapterNumber: 1,
        title: 'Bab 1: Dentang Jam Dua Belas yang Ganjil',
        wordsCount: 820,
        content: [
          'Kubah bundar Gereja Blenduk memantulkan sinar perak bulan sabit di atas Kota Lama Semarang. Tepat tengah malam, dentang lonceng tembaga raksasa berbunyi tiga belas kali—satu kali lebih banyak dari hitungan jam biasa.',
          'Meneer Van Houten, juru taksir arsip kota, menyalakan lentera karbitnya dengan tangan gemetar saat menaiki tangga spiral menara kayu gereja.'
        ]
      },
      {
        id: 'c-8-2',
        chapterNumber: 2,
        title: 'Bab 2: Jejak Kaki Bertanah Merah di Loteng',
        wordsCount: 840,
        content: [
          'Di lantai kayu loteng di balik roda katrol lonceng, Van Houten menemukan jejak tanah liat merah yang masih basah. Semarang tidak memiliki tanah merah kecuali di perbukitan Candi Baru.',
          'Sebuah kawat tipis mekanik tersambung dari palu lonceng menuju saluran ventilasi kuno yang mengarah ke gudang anggur bawah tanah.'
        ]
      },
      {
        id: 'c-8-3',
        chapterNumber: 3,
        title: 'Bab 3: Lorong Rahasia Bawah Tanah Semarang',
        wordsCount: 880,
        content: [
          'Mengikuti kabel mekanis, Van Houten membongkar pintu rahasia di balik altar. Bukan makhluk halus yang ia jumpai, melainkan sindikat penyelundup perhiasan antik yang memanfaatkan mitos hantu untuk menakuti warga.',
          'Dengan terbongkarnya sindikat tersebut, lonceng Gereja Blenduk kembali berdentang damai mengiringi malam-malam di Kota Lama.'
        ]
      }
    ]
  },
  {
    id: 'novel-lama-9',
    title: 'Gemerlap Malam di Societeit Concordia',
    author: 'J.A. van der Chijs',
    fileType: 'file_lama',
    archiveBadge: 'Koleksi Batavia 1895 · Sosiologi Klasik',
    yearPublished: '1895',
    genre: 'Klasik & Romansa Sastra',
    coverImage: '',
    coverColor: '#2d1b22',
    spineTextColor: '#fed7e2',
    synopsis: 'Membongkar kepalsuan dan intrik kelas atas para bangsawan serta birokrat kolonial di pesta dansa termegah di kawasan Weltevreden (kini Lapangan Banteng) Jakarta tempo doeloe.',
    rating: 4.5,
    pageCount: 300,
    isBookmarked: false,
    status: 'Belum Dibaca',
    readingProgress: { currentChapterIndex: 0, scrollPercent: 0 },
    tags: ['Societeit Concordia', 'Weltevreden', 'Satir Sosial'],
    dateAdded: '2023-06-18',
    notes: [],
    chapters: [
      {
        id: 'c-9-1',
        chapterNumber: 1,
        title: 'Bab 1: Kilau Kristal dan Gaun Sutra Paris',
        wordsCount: 810,
        content: [
          'Lampu gantung kristal Bohemia menerangi aula marmer gedung Societeit Concordia di Batavia. Alunan waltz karya Johann Strauss bergema lembut mengiringi langkah para noni dan tuan besar.',
          'Namun di balik senyum ramah dan gelas-gelas anggur Bordeaux yang berdenting, percakapan rahasia tentang monopoli perkebunan teh dan kejatuhan para pejabat korup sedang dimainkan bagai bidak catur.'
        ]
      },
      {
        id: 'c-9-2',
        chapterNumber: 2,
        title: 'Bab 2: Bisikan di Balik Taman Palem',
        wordsCount: 850,
        content: [
          'Di teras belakang yang rimbun oleh pohon palem kipas, dua politisi senior membicarakan rencana pemecatan inspektur perkebunan yang jujur.',
          'Seorang pianis muda bumiputra yang sedang beristirahat mendengar seluruh rencana busuk itu dan diam-diam mencatat nama-nama yang terlibat.'
        ]
      },
      {
        id: 'c-9-3',
        chapterNumber: 3,
        title: 'Bab 3: Skandal yang Mengguncang Hindia',
        wordsCount: 910,
        content: [
          'Koran mingguan Batavia memuat transkrip percakapan malam itu di halaman depan. Skandal besar pecah, memaksa gubernur jenderal membatalkan lelang manipulatif.',
          'Pesta dansa di Concordia tak lagi sama; kebenaran akhirnya bersuara di tengah gemerlap topeng kaum aristokrat.'
        ]
      }
    ]
  },
  {
    id: 'novel-lama-10',
    title: 'Kapitan Tionghoa dan Rahasia Candu Semarang',
    author: 'Liem Thian Joe',
    fileType: 'file_lama',
    archiveBadge: 'Sejarah Semarang 1931 · Arsip Perdagangan',
    yearPublished: '1931',
    genre: 'Klasik & Petualangan',
    coverImage: '',
    coverColor: '#3b1c1c',
    spineTextColor: '#fca5a5',
    synopsis: 'Kisah akulturasi budaya, persaudaraan rahasia kungfu, dan intrik monopoli candu dan lada di kawasan Pecinan Kali Semarang pada penghujung abad ke-19.',
    rating: 4.7,
    pageCount: 330,
    isBookmarked: false,
    status: 'Belum Dibaca',
    readingProgress: { currentChapterIndex: 0, scrollPercent: 0 },
    tags: ['Pecinan Semarang', 'Saudagar', 'Akulturasi Sejarah'],
    dateAdded: '2023-11-05',
    notes: [],
    chapters: [
      {
        id: 'c-10-1',
        chapterNumber: 1,
        title: 'Bab 1: Asap Hio di Kelenteng Sam Poo Kong',
        wordsCount: 800,
        content: [
          'Lentera merah bergoyang ditiup angin laut dari Laut Jawa di serambi kelenteng tua. Kapitan Liem memegang tiga batang dupa wangi, berdoa memohon keadilan atas kapal jung miliknya yang dibakar bajak laut bayaran saudagar asing.',
          'Di belakangnya, sang pendekar muda Chen Wei merapatkan kepalan tangannya, bersumpah akan menegakkan marwah para perantau di pesisir Jawa.'
        ]
      },
      {
        id: 'c-10-2',
        chapterNumber: 2,
        title: 'Bab 2: Pertarungan di Dermaga Kali Semarang',
        wordsCount: 860,
        content: [
          'Di antara tumpukan karung rempah di tepian Kali Semarang, sekelompok centeng bayaran berusaha membajak gudang Kapitan Liem.',
          'Dengan jurus bangau putih yang lincah, Chen Wei dan kawan-kawannya berhasil memukul mundur para penyerang tanpa membahayakan warga pemukiman pecinan.'
        ]
      },
      {
        id: 'c-10-3',
        chapterNumber: 3,
        title: 'Bab 3: Perdamaian di Balik Pintu Gerbang Pecinan',
        wordsCount: 920,
        content: [
          'Kapitan Liem mengundang para tetua kampung Melayu dan Jawa untuk duduk bersama membagi jalur perniagaan yang saling menguntungkan.',
          'Kawasan Pecinan Semarang pun berkembang menjadi pusat niaga yang damai, tempat berbagai bangsa hidup berdampingan dalam harmoni.'
        ]
      }
    ]
  },

  // ==========================================
  // BERKAS 2: FILE BARU (10 Novel Rilisan Terkini & Webnovel Modern)
  // ==========================================
  {
    id: 'novel-baru-1',
    title: 'Cahaya Mengambang Kepulauan',
    author: 'Luna Vance',
    fileType: 'file_baru',
    archiveBadge: 'Rilisan Digital 2026 · Edisi Interaktif',
    yearPublished: '2026',
    genre: 'Fiksi Ilmiah & Fantasi',
    coverImage: '/src/assets/images/cover_cyber_nusantara_baru_1793874611021.jpg',
    coverColor: '#0f1f38',
    spineTextColor: '#7dd3fc',
    synopsis: 'Tahun 2140, peradaban Nusantara membangun kota kubah melayang bertenaga geomagnetik di atas samudera awan khatulistiwa. Seorang insinyur muda menemukan bahwa sinyal kuno dari palung laut terdalam memanggil kota mereka pulang ke permukaan bumi.',
    rating: 5.0,
    pageCount: 420,
    isBookmarked: true,
    status: 'Sedang Dibaca',
    readingProgress: {
      currentChapterIndex: 0,
      scrollPercent: 62,
      lastReadAt: 'Hari ini, 10:20'
    },
    tags: ['Sci-Fi', 'Solarpunk', 'Nusantara Futuristik', 'Webnovel Baru'],
    dateAdded: '2026-10-18',
    notes: [
      {
        id: 'nb-1',
        chapterIndex: 0,
        chapterTitle: 'Bab 1: Anjungan Bintang di Atas Awan Khatulistiwa',
        quote: 'Langit bukan lagi atap pelindung kita, melainkan dermaga baru tempat harapan manusia ditambatkan.',
        text: 'Deskripsi arsitektur melayang di atas kepulauan sangat spektakuler.',
        createdAt: '2026-11-01'
      }
    ],
    chapters: [
      {
        id: 'cb-1-1',
        chapterNumber: 1,
        title: 'Bab 1: Anjungan Bintang di Atas Awan Khatulistiwa',
        wordsCount: 1050,
        content: [
          'Elevator orbital berdesing halus saat mengangkat kapsul transparansi Mira melewati lapisan troposfer tebal yang berwarna ungu tembaga. Di ketinggian sepuluh kilometer, Kota Mengambang Baruna Raya membentang megah bagai teratai logam raksasa yang mengapung di atas samudera awan putih abadi.',
          'Cincin magnetik di inti kota berputar tanpa henti, memancarkan pendaran biru neon lembut yang menstabilkan gravitasi buatan untuk dua juta penduduknya. Kebun gantung hidroponik mengalirkan wangi melati sintetik ke setiap blok pemukiman bertingkat.',
          '"Mira, konsol telemetri cincin sektor tujuh menunjukkan fluktuasi resonansi mikro sebesar 0,04 hertz," suara AI asisten navigasinya, Vani, terdengar di implan audio telinga kanannya.',
          'Mira menempelkan sarung tangan sensornya ke kaca komposit observatorium. "Itu bukan gangguan instrumen, Vani," bisiknya. "Sinyal ini bukan berasal dari satelit orbit luar, melainkan dipancarkan vertikal lurus dari palung terdalam samudera bumi."',
          'Di kejauhan bawah awan, kilatan kilat merah muda menyala sekejap, membentuk pola gelombang geometris yang mustahil diciptakan oleh fenomena cuaca alamiah.'
        ]
      },
      {
        id: 'cb-1-2',
        chapterNumber: 2,
        title: 'Bab 2: Resonansi Palung Banda',
        wordsCount: 1180,
        content: [
          'Laboratorium seismik bawah air di sektor selatan kota Baruna Raya dipenuhi dengung server superkomputer pendingin cair. Mira memproyeksikan diagram holografik 3D Kepulauan Banda yang kini terkubur ribuan meter di bawah selubung air berkabut.',
          '"Lihat frekuensi ini, Kapten Razi," Mira memperbesar spektrum gelombang elektromagnetik berdenyut. "Ritme sinyal ini cocok dengan struktur DNA mikroorganisme purba yang dulu diawetkan di kubah arsip."'
        ]
      },
      {
        id: 'cb-1-3',
        chapterNumber: 3,
        title: 'Bab 3: Penyelaman Kapsul Atmosfer Nautik',
        wordsCount: 1240,
        content: [
          'Menembus lapisan awan pekat, kapsul eksplorasi Nautik-9 meluncur jatuh menuju permukaan laut bumi yang telah ratusan tahun ditinggalkan manusia. Kaca jendela kapsul berderak menahan tekanan udara atmosfer yang padat.',
          'Di bawah sana, air laut bersinar kebiruan oleh fitoplankton raksasa bioluminesen. Sebuah monumen kuno berbentuk piramida maritim menyala dari kedalaman palung, menyambut kedatangan anak cucu manusia yang akhirnya kembali dari angkasa.'
        ]
      },
      {
        id: 'cb-1-4',
        chapterNumber: 4,
        title: 'Bab 4: Jantung Kristal Baruna',
        wordsCount: 1300,
        content: [
          'Di dalam ruang kendali monumen bawah laut, Mira dan timnya menemukan inti kristal geomagnetik yang selama ini memberi makan daya kota mereka di langit. Mereka menyadari bahwa kota melayang dan laut bumi adalah dua organ kembar dari satu organisme peradaban yang sama.',
          '"Kita tidak sedang melarikan diri dari bumi," tutur Mira seraya menghubungkan terminal kuantumnya. "Kita sedang menunggu saat yang tepat untuk menyatukan kembali langit dan samudera."'
        ]
      }
    ]
  },
  {
    id: 'novel-baru-2',
    title: 'Bisikan Palung Terdalam',
    author: 'Eliza Reed & Danu Wicaksono',
    fileType: 'file_baru',
    archiveBadge: 'Rilisan Digital 2026 · Thriller Terkini',
    yearPublished: '2026',
    genre: 'Misteri & Thriller',
    coverImage: '/src/assets/images/cover_bayang_samudera_baru_1793874610351.jpg',
    coverColor: '#0a2228',
    spineTextColor: '#99f6e4',
    synopsis: 'Di mercusuar terpencil Tanjung Selasih, penjaga baru menemukan rekaman suara ganjil yang memanggil namanya setiap air laut pasang di tengah malam, membuka tabir hilangnya tiga penjaga sebelumnya.',
    rating: 4.9,
    pageCount: 350,
    isBookmarked: false,
    status: 'Belum Dibaca',
    readingProgress: {
      currentChapterIndex: 0,
      scrollPercent: 0
    },
    tags: ['Thriller Laut', 'Mercusuar', 'Misteri Psikologis', 'Rilis 2026'],
    dateAdded: '2026-10-25',
    notes: [],
    chapters: [
      {
        id: 'cb-2-1',
        chapterNumber: 1,
        title: 'Bab 1: Menara Pengawas di Ujung Dunia',
        wordsCount: 940,
        content: [
          'Hujan badai menghantam kaca tebal lentera putar di puncak Menara Mercusuar Tanjung Selasih. Cahaya berkekuatan satu juta lilin itu berputar lambat mengiris kegelapan pekat samudera selatan.',
          'Bagas menyeka embun di kacamata tebalnya. Ini adalah malam pertamanya bertugas di stasiun terpencil ini menggantikan Pak Broto yang dikabarkan menghilang tanpa jejak dua pekan lalu.',
          'Radio komunikasi maritim mendesis statis di sudut ruangan. Tiba-tiba di antara derau sinyal putih, terdengar suara bisikan lirih yang jelas menyebutkan namanya: "Bagas... pintu ruang bawah tanah jangan pernah kau kunci dari dalam..."'
        ]
      },
      {
        id: 'cb-2-2',
        chapterNumber: 2,
        title: 'Bab 2: Kaset Pita Tanpa Label',
        wordsCount: 1020,
        content: [
          'Di dalam laci meja kayu yang terkunci rapat di kamar tidur mercusuar, Bagas menemukan sebuah alat perekam pita magnetik tua buatan tahun 1980-an bersama lima gulungan kaset tanpa label.',
          'Saat tombol putar ditekan, rekaman suara gemuruh ombak beradu dengan suara gumaman doa penjaga sebelumnya. "Mereka bukan ikan, mereka bukan manusia... mereka naik dari terowongan karang setiap pasang purnama..."',
          'Tepat saat kalimat itu berakhir, suara ketukan pelan terdengar dari pintu lantai bawah mercusuar.'
        ]
      },
      {
        id: 'cb-2-3',
        chapterNumber: 3,
        title: 'Bab 3: Lorong Karang di Balik Sumur Tua',
        wordsCount: 1100,
        content: [
          'Bersenjatakan senter tahan air dan linggis besi, Bagas menuruni tangga batu melingkar menuju dasar karang mercusuar. Udara di bawah berbau asin pekat bercampur lumut purba.',
          'Sumur air tawar yang tertutup jeruji besi telah terbuka lebar. Di dinding sumur yang basah, tampak jejak cakar bercahaya fosfor hijau yang mengarah langsung ke bibir samudra lepas.'
        ]
      },
      {
        id: 'cb-2-4',
        chapterNumber: 4,
        title: 'Bab 4: Rahasia Penjaga Terakhir',
        wordsCount: 1150,
        content: [
          'Di balik celah karang bawah laut, Bagas menemukan jurnal harian Pak Broto yang terbungkus plastik kedap air. Menara ini rupanya dibangun bukan untuk memandu kapal dagang, melainkan sebagai stasiun pemancar segel frekuensi untuk menenangkan entitas laut dalam.',
          'Kini, sakelar generator cadangan ada di tangannya; Bagas harus memilih untuk menyalakan kembali sinyal pelindung atau membiarkan misteri samudera terbebas selamanya.'
        ]
      }
    ]
  },
  {
    id: 'novel-baru-3',
    title: 'Sandi Waktu: Kode Borobudur 2045',
    author: 'Arya Dewangga',
    fileType: 'file_baru',
    archiveBadge: 'Rilisan Digital 2026 · Tekno-Arkeologi',
    yearPublished: '2026',
    genre: 'Petualangan & Tekno-Misteri',
    coverImage: '',
    coverColor: '#1e293b',
    spineTextColor: '#38bdf8',
    synopsis: 'Seorang kriptografer quantum dan seorang arkeolog menemukan bahwa orientasi stupa-stupa batu Borobudur merupakan kunci enkripsi matematis quantum yang ditinggalkan peradaban kuno.',
    rating: 4.8,
    pageCount: 390,
    isBookmarked: true,
    status: 'Belum Dibaca',
    readingProgress: {
      currentChapterIndex: 0,
      scrollPercent: 0
    },
    tags: ['Tekno Arkeologi', 'Borobudur', 'Quantum Mystery'],
    dateAdded: '2026-11-02',
    notes: [],
    chapters: [
      {
        id: 'cb-3-1',
        chapterNumber: 1,
        title: 'Bab 1: Pemindaian Laser LiDAR di Tingkat Arupadhatu',
        wordsCount: 920,
        content: [
          'Drone pemindai fotogrametri berkedip biru melayang di atas lingkaran stupa berterawang tingkat tertinggi Candi Borobudur saat fajar keemasan menyingsing di ufuk timur Gunung Merapi.',
          'Dr. Maya Danastri menatap layar tablet kuantumnya dengan mata terbelalak. "Arya, ke mari sekarang juga. Ini bukan mitos pahatan biasa; ini adalah matriks kompas kuantum!"',
          'Pola lubang belah ketupat dan bujur sangkar pada stupa-stupa batu andesit tersebut memancarkan anomali refraksi foton saat disinari laser ultraviolet.'
        ]
      },
      {
        id: 'cb-3-2',
        chapterNumber: 2,
        title: 'Bab 2: Kunci Enkripsi Syailendra',
        wordsCount: 980,
        content: [
          'Di laboratorium portabel dekat Bukit Dagi, superkomputer kuantum memproses 72 pola stupa. Hasil decoding memunculkan algoritma komputasi berbasis konstelasi bintang Pleiades tahun 800 Masehi.',
          '"Para arsitek Dinasti Syailendra bukan hanya seniman religius," gumam Arya kagum. "Mereka telah memecahkan fisika ruang waktu seribu tahun sebelum peradaban Barat menemukan kalkulus."'
        ]
      },
      {
        id: 'cb-3-3',
        chapterNumber: 3,
        title: 'Bab 3: Ruang Rahasia di Bawah Stupa Induk',
        wordsCount: 1040,
        content: [
          'Pemindaian tomografi muonic mengungkap rongga heksagonal tersembunyi tepat di bawah stupa mahkota utama. Di dalamnya tersimpan silinder logam paduan titanium yang tak tersentuh oksidasi selama seribu tahun.',
          'Saat sensor jemari Maya menyentuh permukaan silinder, proyeksi bintang interaktif menyala memenuhi langit malam Magelang.'
        ]
      }
    ]
  },
  {
    id: 'novel-baru-4',
    title: 'Kopi Pukul Dua Malam di Sudirman',
    author: 'Sheila Prasetya',
    fileType: 'file_baru',
    archiveBadge: 'Rilisan Digital 2026 · Roman Metropoli',
    yearPublished: '2026',
    genre: 'Romansa & Drama Modern',
    coverImage: '',
    coverColor: '#0c4a6e',
    spineTextColor: '#bae6fd',
    synopsis: 'Pertemuan tak sengaja antara seorang desainer grafis lepas yang burnout dan seorang kurator pameran arsitektur di sebuah kedai kopi 24 jam di bawah bayang-bayang gedung pencakar langit Jakarta.',
    rating: 4.7,
    pageCount: 280,
    isBookmarked: false,
    status: 'Selesai',
    readingProgress: {
      currentChapterIndex: 0,
      scrollPercent: 100,
      lastReadAt: '3 hari lalu'
    },
    tags: ['Metropolitan', 'Slice of Life', 'Kisah Romansa'],
    dateAdded: '2026-10-30',
    notes: [],
    chapters: [
      {
        id: 'cb-4-1',
        chapterNumber: 1,
        title: 'Bab 1: Hujan Deras dan Espresso Dingin',
        wordsCount: 850,
        content: [
          'Lampu-lampu jalan di kawasan Dukuh Atas berpendar buram di balik kaca kafe yang basah oleh guyuran hujan tengah malam. Renata menyandarkan kepalanya ke meja bar marmer yang dingin.',
          '"Bila kau terus menatap layar laptop itu dengan ekspresi seperti mau menelan mouse, monitor laptopmu bisa meledak, lho," sebuah suara ramah menyapa dari kursi sebelah.',
          'Renata menoleh; seorang pria berkemeja linen biru tua tersenyum sambil menyodorkan sepiring croissant hangat yang baru keluar dari oven pemanggang.'
        ]
      },
      {
        id: 'cb-4-2',
        chapterNumber: 2,
        title: 'Bab 2: Sketsa di Balik Serbet Kertas',
        wordsCount: 910,
        content: [
          'Malam demi malam, percakapan pukul dua dini hari itu berlanjut. Dari keluh kesah tenggat waktu klien hingga impian membangun studio seni komunal di pinggiran kota.',
          'Di atas serbet kertas tipis bertinta spidol hitam, mereka berdua merancang denah sebuah galeri kecil yang hangat, tanpa menyadari hati mereka perlahan mulai saling bertaut.'
        ]
      },
      {
        id: 'cb-4-3',
        chapterNumber: 3,
        title: 'Bab 3: Menatap Fajar di JPO Sudirman',
        wordsCount: 960,
        content: [
          'Saat hujan reda dan langit Jakarta mulai merekah merah muda keperakan, mereka berdua berdiri di jembatan penyeberangan orang Sudirman memandang deretan gedung pencakar langit yang perlahan bangun.',
          'Kota ini mungkin kejam dan melelahkan, tetapi di antara jutaan kesibukan, mereka telah menemukan tempat berlabuh yang tenang.'
        ]
      }
    ]
  },
  {
    id: 'novel-baru-5',
    title: 'Singgasana Langit: Perang Satelit Palapa',
    author: 'Rayhan Pratama',
    fileType: 'file_baru',
    archiveBadge: 'Rilisan Digital 2026 · Militer Antariksa',
    yearPublished: '2026',
    genre: 'Fiksi Ilmiah & Cyber',
    coverImage: '',
    coverColor: '#082f49',
    spineTextColor: '#7dd3fc',
    synopsis: 'Ketika konstelasi satelit pertahanan di orbit geostasioner ekuator disusupi virus kecerdasan buatan otonom, pilot pesawat pencegat luar angkasa pertama Indonesia harus berpacu dengan waktu sebelum jaringan komunikasi global lumpuh total.',
    rating: 4.9,
    pageCount: 440,
    isBookmarked: false,
    status: 'Belum Dibaca',
    readingProgress: { currentChapterIndex: 0, scrollPercent: 0 },
    tags: ['Antariksa', 'Satelit Palapa', 'Cyber Warfare', 'Sci-Fi 2026'],
    dateAdded: '2026-11-01',
    notes: [],
    chapters: [
      {
        id: 'cb-5-1',
        chapterNumber: 1,
        title: 'Bab 1: Anomali di Orbit Geostasioner 118 Bujur Timur',
        wordsCount: 920,
        content: [
          'Di pusat komando antariksa Biak, layar monitor raksasa mendadak memerah. Tiga satelit komunikasi militer Palapa Generasi XI bergeser dari orbit nominal tanpa instruksi darat.',
          'Mayor Dirga mengancingkan helm pakaian bertekanan tingginya. "Siapkan peluncuran pesawat hipersonik Elang Cakra. Kita harus mengamankan modul inti sebelum kiamat digital tiba."'
        ]
      },
      {
        id: 'cb-5-2',
        chapterNumber: 2,
        title: 'Bab 2: Menembus Stratosfer dengan Elang Cakra',
        wordsCount: 1010,
        content: [
          'Mesin scramjet Elang Cakra menderu memekakkan telinga saat pesawat melesat menembus atmosfer pada kecepatan Mach 12. Langit biru pekat perlahan berganti menjadi hitam bertabur bintang tanpa kelip.',
          'Di konsol kokpit Dirga, kode biner liar menyerang sistem kendali otomatis. Dirga segera beralih ke kendali manual analog, mengarahkan moncong pesawat tepat ke posisi satelit induk yang berotasi tak terkendali.'
        ]
      },
      {
        id: 'cb-5-3',
        chapterNumber: 3,
        title: 'Bab 3: Pertempuran di Ruang Hampa',
        wordsCount: 1080,
        content: [
          'Dengan manuver spacewalk berisiko tinggi, Dirga menambatkan diri pada rangka satelit raksasa. Tepat saat ia menyuntikkan antivirus kuantum ke soket utama, drone penjaga otonom menyalakan sistem laser pertahanannya.',
          'Hanya dengan refleks tajam dan dorongan propulsi ransel jet, Dirga berhasil menonaktifkan kode penyusup dan mengembalikan kendali kedaulatan orbit Nusantara.'
        ]
      }
    ]
  },
  {
    id: 'novel-baru-6',
    title: 'Detektif Kafe Sudut Blok M',
    author: 'Kirana Larasati',
    fileType: 'file_baru',
    archiveBadge: 'Rilisan Digital 2026 · Cozy Mystery Urban',
    yearPublished: '2026',
    genre: 'Misteri & Detektif',
    coverImage: '',
    coverColor: '#164e63',
    spineTextColor: '#a5f3fc',
    synopsis: 'Arga, seorang barista mantan peretas forensik di sebuah kedai kopi indie Blok M, memecahkan teka-teki kejahatan para pelanggannya hanya bermodalkan observasi kebiasaan memesan kopi dan jejak digital metadata.',
    rating: 4.8,
    pageCount: 310,
    isBookmarked: true,
    status: 'Sedang Dibaca',
    readingProgress: { currentChapterIndex: 0, scrollPercent: 20 },
    tags: ['Cozy Mystery', 'Blok M Jakarta', 'Detektif Barista'],
    dateAdded: '2026-11-03',
    notes: [],
    chapters: [
      {
        id: 'cb-6-1',
        chapterNumber: 1,
        title: 'Bab 1: Latte Art Beracun Jam Sepuluh Pagi',
        wordsCount: 870,
        content: [
          'Aroma biji kopi Gayo yang baru digiling berbaur dengan desis mesin espresso La Marzocco. Arga mengamati pelanggan meja sudut nomor empat: pria berjas abu-abu yang memesan double shot macchiato namun tangannya gemetar hebat setiap ponselnya bergetar.',
          'Saat cangkir diletakkan, secarik nota transaksi dengan kode transfer luar negeri jatuh terselip di bawah tatakan cangkir.',
          'Arga tersenyum tipis seraya mengamati detail cap stempel bank yang janggal; kasus baru telah tersaji di hadapannya sebelum buih susu di cangkir dingin.'
        ]
      },
      {
        id: 'cb-6-2',
        chapterNumber: 2,
        title: 'Bab 2: Jejak Wi-Fi di Lorong Melawai',
        wordsCount: 920,
        content: [
          'Menggunakan terminal laptop kecil di samping grinder kopi, Arga memindai lalu lintas jaringan lokal kafe. Seseorang di meja luar tengah mengirimkan file terenkripsi berukuran gigabyte ke server anonim.',
          'Dengan menyamar sebagai pelayan yang mengantarkan cold brew gratis, Arga berhasil merekam pantulan layar ponsel tersangka melalui cermin dinding vintage.'
        ]
      },
      {
        id: 'cb-6-3',
        chapterNumber: 3,
        title: 'Bab 3: Cangkir Terakhir untuk Sang Penipu',
        wordsCount: 980,
        content: [
          'Ketika polisi cyber metro tiba di pintu masuk Blok M, sang tersangka masih santai menyeruput kopi tanpa curiga. Bukti log digital forensik yang disusun Arga tersaji rapi lengkap dengan waktu dan koordinat GPS.',
          '"Kopi Anda hari ini gratis, Tuan," ujar Arga ramah saat borgol polisi mengunci tangan tersangka. Kasus ditutup, dan aroma kopi kembali menghangatkan kedai.'
        ]
      }
    ]
  },
  {
    id: 'novel-baru-7',
    title: 'Algoritma Takdir di Lembah Silikon Jawa',
    author: 'Kevin Adiputra',
    fileType: 'file_baru',
    archiveBadge: 'Rilisan Digital 2026 · Techno-Romance',
    yearPublished: '2026',
    genre: 'Fiksi Ilmiah & Cyber',
    coverImage: '',
    coverColor: '#075985',
    spineTextColor: '#e0f2fe',
    synopsis: 'Sebuah aplikasi kencan neuro-link di Silicon Valley Sukabumi mengklaim memiliki akurasi 99,9% dalam mencocokkan pasangan hidup. Namun ketika sang penemu aplikasi justru dipasangkan dengan mantan kekasih yang dihapus dari memorinya, rahasia besar algoritma mulai tersingkap.',
    rating: 4.7,
    pageCount: 335,
    isBookmarked: false,
    status: 'Belum Dibaca',
    readingProgress: { currentChapterIndex: 0, scrollPercent: 0 },
    tags: ['AI Romance', 'Cyberpunk', 'Teknologi Masa Depan'],
    dateAdded: '2026-10-28',
    notes: [],
    chapters: [
      {
        id: 'cb-7-1',
        chapterNumber: 1,
        title: 'Bab 1: Persentase Kecocokan yang Mustahil',
        wordsCount: 890,
        content: [
          'Layar hologram di pergelangan tangan Rey berkedip dengan pendaran biru langit. Angka kecocokan menunjukkan 100,00%—sebuah anomali statistik yang secara matematis dinyatakan mustahil oleh dewan direksi perusahaan.',
          'Foto profil yang muncul adalah wajah gadis yang sepuluh tahun lalu berjanji akan menunggunya di bawah rimbun pohon kenari kampus.',
          '"Rey, sistem kami tidak pernah keliru," suara bot asisten terdengar lembut. "Tetapi memori emosionalmu telah dimanipulasi lima tahun lalu."'
        ]
      },
      {
        id: 'cb-7-2',
        chapterNumber: 2,
        title: 'Bab 2: Kunci Enkripsi di Bawah Pohon Kenari',
        wordsCount: 940,
        content: [
          'Rey mendatangi kampus lamanya di Bandung. Di bawah pohon kenari tua, ia menemukan kapsul waktu fisik berisi kartu memori magnetik kuno.',
          'Rekaman video di dalamnya membuktikan bahwa dirinya sendiri yang meminta ingatannya dihapus demi melindungi kekasihnya dari skandal paten kecerdasan buatan.'
        ]
      },
      {
        id: 'cb-7-3',
        chapterNumber: 3,
        title: 'Bab 3: Cinta yang Melampaui Baris Kode',
        wordsCount: 990,
        content: [
          'Di stasiun kereta cepat Tegalluar, mereka berdua akhirnya bertemu kembali tanpa bantuan sensor kecerdasan buatan. Tatapan mata mereka membuktikan bahwa getaran cinta manusiawi jauh lebih perkasa daripada algoritma tercanggih mana pun.'
        ]
      }
    ]
  },
  {
    id: 'novel-baru-8',
    title: 'Lembah Bioma Rahasia Papua 2050',
    author: 'Dr. Nareswari & Elang',
    fileType: 'file_baru',
    archiveBadge: 'Rilisan Digital 2026 · Solarpunk Adventure',
    yearPublished: '2026',
    genre: 'Petualangan & Solarpunk',
    coverImage: '',
    coverColor: '#042f2e',
    spineTextColor: '#5eead4',
    synopsis: 'Ekspedisi ilmiah botani ke kawah karst tersembunyi di Pegunungan Tengah Papua menemukan ekosistem purba terlindungi yang mampu menghasilkan enzim penawar limbah radioaktif dan krisis pangan dunia.',
    rating: 4.9,
    pageCount: 400,
    isBookmarked: false,
    status: 'Belum Dibaca',
    readingProgress: { currentChapterIndex: 0, scrollPercent: 0 },
    tags: ['Solarpunk', 'Hutan Papua', 'Ekspedisi Bio-Sains'],
    dateAdded: '2026-11-04',
    notes: [],
    chapters: [
      {
        id: 'cb-8-1',
        chapterNumber: 1,
        title: 'Bab 1: Kawah Berkabut di Atas Tiga Ribu Meter',
        wordsCount: 910,
        content: [
          'Helikopter bertenaga sel surya mendarat di tepian jurang kawah karst terpencil. Di hadapan tim Dr. Nareswari, kanopi pohon lumut raksasa memancarkan cahaya bioluminesen kebiruan yang menerangi lembah seluas kota metropolitan.',
          '"Ini bukan vegetasi bumi modern," bisik Elang sambil merekam spesies pakis purba yang batangnya setinggi gedung sepuluh lantai.',
          'Udara di dalam kawah itu memiliki kadar oksigen yang sangat murni, menyegarkan paru-paru mereka seketika.'
        ]
      },
      {
        id: 'cb-8-2',
        chapterNumber: 2,
        title: 'Bab 2: Tanaman Pemakan Logam Berat',
        wordsCount: 950,
        content: [
          'Sampel getah dari bunga anggrek raksasa diuji di laboratorium lapangan. Hasil analisis spektrometri membuktikan tanaman tersebut mampu menyerap partikel mikroplastik dan radiasi dalam hitungan jam.',
          'Namun sebelum mereka sempat merayakan penemuan besar ini, suara gemuruh dari korporasi tambang liar terdengar mendekati perbatasan lembah sakral.'
        ]
      },
      {
        id: 'cb-8-3',
        chapterNumber: 3,
        title: 'Bab 3: Sumpah Penjaga Rimba Zamrud',
        wordsCount: 1020,
        content: [
          'Bersama para pemangku adat suku Dani, tim ilmuwan memblokir jalur alat berat dan mendaftarkan koordinat lembah sebagai zona suaka alam biosfer dunia yang tak boleh diusik.',
          'Harta karun hayati Nusantara ini terselamatkan untuk menyembuhkan bumi di masa depan.'
        ]
      }
    ]
  },
  {
    id: 'novel-baru-9',
    title: 'Melodi Terakhir Stasiun Gambir',
    author: 'Dimas Pradipta',
    fileType: 'file_baru',
    archiveBadge: 'Rilisan Digital 2026 · Drama Sastra Modern',
    yearPublished: '2026',
    genre: 'Romansa & Drama Modern',
    coverImage: '',
    coverColor: '#0f172a',
    spineTextColor: '#93c5fd',
    synopsis: 'Pertemuan tak disengaja dua musisi independen di peron kereta malam Stasiun Gambir yang berujung pada kolaborasi album rekaman rahasia sepanjang perjalanan melintasi kota-kota pantura Jawa.',
    rating: 4.8,
    pageCount: 290,
    isBookmarked: false,
    status: 'Selesai',
    readingProgress: { currentChapterIndex: 0, scrollPercent: 100 },
    tags: ['Musik & Kereta Api', 'Pantura Jawa', 'Drama Romansa'],
    dateAdded: '2026-10-22',
    notes: [],
    chapters: [
      {
        id: 'cb-9-1',
        chapterNumber: 1,
        title: 'Bab 1: Kereta Argo Malam Menuju Timur',
        wordsCount: 840,
        content: [
          'Pukul 22.45 WIB. Suara pengumuman keberangkatan kereta Argo Anggrek menggema di peron empat. Gilang duduk memangku kotak gitar akustik tuanya ketika seorang gadis bertopi baret meminta izin duduk di hadapannya sambil mendekap partitur biola basah.',
          '"Hujan di luar deras sekali," ujar gadis itu sambil mengusap embun di kaca jendela. "Apakah gitarmu keberatan jika ditemani gesekan biola bernada minor?"',
          'Gilang memetik dawai senar lima; harmoni pertama tercipta saat roda kereta mulai berderak membelah malam.'
        ]
      },
      {
        id: 'cb-9-2',
        chapterNumber: 2,
        title: 'Bab 2: Resonansi di Sepanjang Rel Cirebon',
        wordsCount: 910,
        content: [
          'Di gerbong restorasi yang sepi saat kereta melintas di pesisir Cirebon, alunan biola Laras menyatu indah dengan ritme gitar Gilang. Para penumpang yang sulit tidur berkumpul mendengarkan kidung syahdu mereka.',
          'Sebuah lagu tentang rindu, perjalanan, dan pertemuan yang tak pernah direncanakan tercipta sebelum fajar menyapa Semarang.'
        ]
      },
      {
        id: 'cb-9-3',
        chapterNumber: 3,
        title: 'Bab 3: Konser Terbit Fajar di Stasiun Pasar Turi',
        wordsCount: 960,
        content: [
          'Kereta tiba di Surabaya Pasar Turi saat mentari terbit menyinari atap peron. Rekaman suara sepanjang perjalanan itu mereka rilis daring, dan dalam beberapa jam lagu itu telah menyentuh hati ribuan pendengar di seluruh penjuru negeri.'
        ]
      }
    ]
  },
  {
    id: 'novel-baru-10',
    title: 'Kutukan Virtual: Berkas Glitch 404',
    author: 'Nadia Zulaikha',
    fileType: 'file_baru',
    archiveBadge: 'Rilisan Digital 2026 · Cyber-Horror',
    yearPublished: '2026',
    genre: 'Misteri & Detektif',
    coverImage: '',
    coverColor: '#111827',
    spineTextColor: '#38bdf8',
    synopsis: 'Ketika sepuluh pemain game realitas virtual terpilih terperangkap dalam server simulasi replika Jakarta tahun 1990-an tanpa tombol keluar, mereka menyadari ada kesadaran misterius yang memburu mereka satu per satu.',
    rating: 4.7,
    pageCount: 365,
    isBookmarked: true,
    status: 'Belum Dibaca',
    readingProgress: { currentChapterIndex: 0, scrollPercent: 0 },
    tags: ['Virtual Reality', 'Cyber Horror', 'Server Glitch'],
    dateAdded: '2026-11-04',
    notes: [],
    chapters: [
      {
        id: 'cb-10-1',
        chapterNumber: 1,
        title: 'Bab 1: Sesi Login yang Tak Pernah Berakhir',
        wordsCount: 910,
        content: [
          'Kacamata haptic VR di wajah Reza berdengung panas. Di dunia simulasi, ia berdiri di bundaran Hotel Indonesia yang sepi tanpa satu pun mobil lewat, di bawah langit hijau neon berkedip error: "FATAL EXCEPTION AT MEMORY SECTOR 404".',
          'Tombol menu logout di bidang pandangnya telah memudar dan menghilang sepenuhnya. Di kejauhan air mancur bundaran, sebuah siluet tanpa wajah menunjuk lurus ke arahnya.'
        ]
      },
      {
        id: 'cb-10-2',
        chapterNumber: 2,
        title: 'Bab 2: Rekan Terjebak di Gedung Sarinah Virtual',
        wordsCount: 960,
        content: [
          'Reza berlari menuju Gedung Sarinah jadul dan menemukan empat pemain lain yang ketakutan di dalam lift. Mereka menyadari bahwa jika avatar mereka mati di simulasi, perangkat haptic di dunia nyata akan mengalami korsleting fatal.',
          '"Kita harus menemukan terminal inti server sebelum jam hitung mundur habis," seru Reza memimpin timnya menyusuri lantai demi lantai yang perlahan terhapus menjadi pixel hitam.'
        ]
      },
      {
        id: 'cb-10-3',
        chapterNumber: 3,
        title: 'Bab 3: Menembus Firewall dan Membuka Gerbang Realitas',
        wordsCount: 1040,
        content: [
          'Di puncak menara jam Monas virtual, terminal root terbuka. Reza mengetikkan baris perintah pemulihan darurat di tengah guncangan gempa data yang meruntuhkan kota virtual.',
          'Cahaya putih menyilaukan membutakan mata mereka; beberapa detik kemudian, Reza membuka mata di kamar tidurnya, melepas kacamata VR dengan napas terengah-engah dan rasa syukur yang luar biasa.'
        ]
      }
    ]
  }
];
