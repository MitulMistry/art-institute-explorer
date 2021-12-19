module ClassOrderable
  extend ActiveSupport::Concern

  def ordered
    order(created_at: :desc)
  end

  def randomized(count)
    order(Arel.sql("RANDOM()")).limit(count)
  end
end
