# Preview all emails at http://localhost:3000/rails/mailers/notif_mailer
class NotifMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/notif_mailer/after_send_form
  def after_send_form
    NotifMailer.after_send_form
  end

end
