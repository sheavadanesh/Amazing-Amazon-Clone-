class User < ApplicationRecord
    validates :email, :session_token, presence: true, uniqueness: true
    validates :name, :password_digest, presence: true
    validates :password, length: { minimum: 6, allow_nil: true}

    has_many :cart_items, class_name: "CartItems", foreign_key: :user_id

    after_initialize :ensure_session_token
    attr_reader :password

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)

        user && user.is_password?(password) ? user : nil
    end

    def password=(password)
        self.password_digest = BCrypt::Password.create(password)
        @password = password
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        self.session_token = SecureRandom.urlsafe_base64
        self.save!
        self.session_token
    end

    def ensure_session_token
        self.session_token ||= SecureRandom.urlsafe_base64
    end
end
