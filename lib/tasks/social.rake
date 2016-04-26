namespace :social do
  namespace :twitter do
    task :update_counter => :environment do
      client = Twitter::REST::Client.new do |config|
        config.consumer_key        = TWITTER[:consumer_key]
        config.consumer_secret     = TWITTER[:consumer_secret]
        config.access_token        = TWITTER[:access_token]
        config.access_token_secret = TWITTER[:access_token_secret]
      end

      user = client.user("yourmoneyadvice")
      current_count = user.followers_count

      puts "Twitter followers: #{(current_count / 1000).round}k"
    end
  end
end
