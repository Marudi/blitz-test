export interface Hospital {
  id: string;
  name: string;
  address: string;
  subscriptionType: 'free' | 'basic' | 'premium' | 'enterprise';
  departments: string[];
  features: string[];
  activeUntil: Date;
}

export interface Department {
  id: string;
  name: string;
  type: 'pharmacy' | 'laboratory' | 'scanning' | 'general';
  staff: string[];
}

export interface Bed {
  id: string;
  wardType: 'private' | 'public';
  status: 'available' | 'occupied' | 'reserved';
  price: number;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  medications: Medication[];
  date: Date;
  status: 'pending' | 'filled' | 'cancelled';
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  interactions: string[];
}