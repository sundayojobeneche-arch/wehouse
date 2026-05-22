export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: { id: string; email: string; full_name: string | null; phone: string | null; role: 'student' | 'staff' | 'admin'; avatar_url: string | null; created_at: string; updated_at: string };
      };
      students: {
        Row: { id: string; user_id: string; school: string | null; course: string | null; year_of_study: number | null; student_id_number: string | null; is_verified: boolean; verification_status: 'pending' | 'approved' | 'rejected'; created_at: string; updated_at: string };
      };
      staff: {
        Row: { id: string; user_id: string; department: string | null; position: string | null; is_active: boolean; created_at: string; updated_at: string };
      };
      hostels: {
        Row: { id: string; name: string; school: string; area: string; address: string; price: number; agent_fee: number; gender: 'male' | 'female' | 'mixed'; room_type: string[]; water: boolean; electricity: boolean; description: string | null; facilities: string[]; status: 'available' | 'booked' | 'unavailable'; created_by: string; created_at: string; updated_at: string };
      };
      hostel_images: {
        Row: { id: string; hostel_id: string; image_url: string; is_primary: boolean; created_at: string };
      };
      bookings: {
        Row: { id: string; student_id: string; hostel_id: string; room_type: string; move_in_date: string; move_out_date: string; duration_years: number; status: 'pending' | 'confirmed' | 'cancelled' | 'completed'; total_amount: number; agent_fee: number; created_at: string; updated_at: string };
      };
      payments: {
        Row: { id: string; booking_id: string; student_id: string; amount: number; payment_method: string; payment_plan: 'full' | 'installment'; status: 'pending' | 'completed' | 'failed' | 'refunded'; paystack_reference: string | null; created_at: string; updated_at: string };
      };
      payment_installments: {
        Row: { id: string; payment_id: string; amount: number; due_date: string; paid_date: string | null; status: 'pending' | 'paid' | 'overdue'; installment_number: number; created_at: string };
      };
      stay_tracker: {
        Row: { id: string; booking_id: string; move_in_date: string; move_out_date: string; grace_period_days: number; alert_90_sent: boolean; alert_30_sent: boolean; alert_15_sent: boolean; alert_7_sent: boolean; created_at: string; updated_at: string };
      };
      roommate_profiles: {
        Row: { id: string; student_id: string; budget_min: number; budget_max: number; preferred_school: string | null; preferred_area: string | null; lifestyle: string[]; noise_tolerance: 'low' | 'medium' | 'high'; sleep_schedule: 'early_bird' | 'night_owl' | 'flexible'; cooking_habits: 'often' | 'sometimes' | 'rarely'; cleanliness: 'very_clean' | 'clean' | 'relaxed'; is_active: boolean; created_at: string; updated_at: string };
      };
      chat_rooms: {
        Row: { id: string; student1_id: string; student2_id: string; status: 'active' | 'blocked'; created_at: string; updated_at: string };
      };
      messages: {
        Row: { id: string; chat_room_id: string; sender_id: string; content: string | null; image_url: string | null; is_read: boolean; created_at: string };
      };
      verification_requests: {
        Row: { id: string; student_id: string; id_card_url: string; status: 'pending' | 'approved' | 'rejected'; reviewed_by: string | null; review_note: string | null; created_at: string; updated_at: string };
      };
      reports: {
        Row: { id: string; reporter_id: string; report_type: 'payment_issue' | 'hostel_problem' | 'roommate_complaint' | 'other'; description: string; status: 'open' | 'under_review' | 'resolved'; assigned_to: string | null; resolution_note: string | null; created_at: string; updated_at: string };
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
  };
}
