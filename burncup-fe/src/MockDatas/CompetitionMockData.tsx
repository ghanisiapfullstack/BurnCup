import { Competition } from "@/model/competition_model";

export const mockCompetitions: Competition[] = [
  {
    id: "comp-001",
    name: "Hackathon Nasional 2025",
    description: "Kompetisi pengembangan solusi digital dalam waktu 48 jam.",
    category: "Technology",
    imageUrl: "https://example.com/images/hackathon.jpg",
    registrationStartDate: "2025-07-01",
    registrationEndDate: "2025-07-31",
    competitionStartDate: "2025-08-10",
    competitionEndDate: "2025-08-12",
    competitionType: "Team",
    venue: "Binus Anggrek Campus, Jakarta",
    registrationfee: 150000,
    maxMembers: 4,
    minMembers: 2,
    prizes: [
      {
        id: "prize-001",
        name: "Juara 1",
        description: "Rp 20.000.000 + Sertifikat + Merchandise"
      },
      {
        id: "prize-002",
        name: "Juara 2",
        description: "Rp 10.000.000 + Sertifikat"
      },
      {
        id: "prize-003",
        name: "Juara 3",
        description: "Rp 5.000.000 + Sertifikat"
      }
    ],
    requirements: [
      "Minimal 2 orang per tim, maksimal 4 orang",
      "Mahasiswa aktif D3/S1 di Indonesia",
      "Membawa laptop pribadi"
    ],
    rules: [
      "Tidak boleh menggunakan template jadi",
      "Hasil karya harus orisinal",
      "Tim harus hadir selama sesi presentasi"
    ]
  },
  {
    id: "comp-002",
    name: "Lomba Poster Digital 2025",
    description: "Kompetisi desain poster bertema lingkungan hidup.",
    category: "Design",
    imageUrl: "https://example.com/images/poster.jpg",
    registrationStartDate: "2025-06-15",
    registrationEndDate: "2025-07-15",
    competitionStartDate: "2025-07-20",
    competitionEndDate: "2025-07-20",
    competitionType: "Single",
    venue: "Online Submission",
    registrationfee: 50000,
    prizes: [
      {
        id: "prize-004",
        name: "Juara 1",
        description: "Rp 3.000.000 + Sertifikat"
      },
      {
        id: "prize-005",
        name: "Juara Favorit",
        description: "Rp 1.500.000 + Sertifikat"
      }
    ],
    requirements: [
      "Peserta adalah pelajar/mahasiswa",
      "Desain dikirim dalam format JPG/PNG",
      "Ukuran A3, resolusi minimal 300 DPI"
    ],
    rules: [
      "Desain harus orisinal dan tidak mengandung unsur SARA",
      "Satu peserta hanya boleh mengirimkan 1 karya",
      "Keputusan juri tidak dapat diganggu gugat"
    ]
  }
];