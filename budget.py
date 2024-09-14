import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score

class TouristBudgetEstimator:
    def __init__(self):
        self.model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.scaler = StandardScaler()
        
    def preprocess_data(self, X, y=None):
        if y is not None:
            X_scaled = self.scaler.fit_transform(X)
            return X_scaled, y
        return self.scaler.transform(X)
    
    def train(self, X, y):
        X_scaled, y = self.preprocess_data(X, y)
        self.model.fit(X_scaled, y)
        
    def predict(self, X):
        X_scaled = self.preprocess_data(X)
        return self.model.predict(X_scaled)
    
    def evaluate(self, X, y):
        y_pred = self.predict(X)
        mse = mean_squared_error(y, y_pred)
        r2 = r2_score(y, y_pred)
        return mse, r2

# Example usage
if __name__ == "__main__":
    # Generate some sample data
    np.random.seed(42)
    n_samples = 1000
    
    # Features: [duration, hotel_rating, distance_from_center, popular_attractions, season]
    X = np.column_stack((
        np.random.randint(1, 15, n_samples),  # duration in days
        np.random.uniform(1, 5, n_samples),   # hotel rating
        np.random.uniform(0, 10, n_samples),  # distance from center in km
        np.random.randint(1, 20, n_samples),  # number of popular attractions
        np.random.randint(1, 5, n_samples)    # season (1: winter, 2: spring, 3: summer, 4: fall)
    ))
    
    # Target: budget (in dollars)
    y = 100 * X[:, 0] + 50 * X[:, 1] - 20 * X[:, 2] + 30 * X[:, 3] + 100 * X[:, 4] + np.random.normal(0, 100, n_samples)
    
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Create and train the model
    estimator = TouristBudgetEstimator()
    estimator.train(X_train, y_train)
    
    # Evaluate the model
    mse, r2 = estimator.evaluate(X_test, y_test)
    print(f"Mean Squared Error: {mse:.2f}")
    print(f"R-squared Score: {r2:.2f}")
    
    # Make a prediction for a new tourist place
    new_place = np.array([[7, 4.5, 2, 15, 3]])  # 7-day trip, 4.5-star hotel, 2km from center, 15 attractions, summer
    estimated_budget = estimator.predict(new_place)
    print(f"Estimated budget for the new place: ${estimated_budget[0]:.2f}")
