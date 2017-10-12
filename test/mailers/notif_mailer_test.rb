require 'test_helper'

class NotifMailerTest < ActionMailer::TestCase
  test "after_send_form" do
    mail = NotifMailer.after_send_form
    assert_equal "After send form", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
