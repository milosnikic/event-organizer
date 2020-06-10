(ns event-organizer.user
  (:require [schema.core :as s]
            [event-organizer.string-util :as str]
            [event-organizer.models.user :refer [User]]
            [buddy.hashers :as hashers]
            [clojure.set :refer [rename-keys]]
            [toucan.db :as db]
            [ring.util.http-response :refer [created ok not-found]]
            [compojure.api.sweet :refer [POST GET PUT DELETE]]))


(defn valid-username? [name]
  (str/non-blank-with-length? 3 50 name))

(defn valid-password? [password]
  (str/length-in-range? 5 50 password))

; Login request schema
(s/defschema LoginRequestSchema
  {:username  s/Str 
   :password  s/Str })
  
; User request schema
(s/defschema UserRequestSchema
  {:username (s/constrained s/Str valid-username?)
   :password (s/constrained s/Str valid-password?)
   :email (s/constrained s/Str str/email?)})

; User create API
(defn id->created [id]
  (created (str "/users/" id) {:id id}))

; User get api
(defn user->response [user]
  (if user
    (ok user)
    (not-found)))


; Create user handler
(defn create-user-handler [create-user-req]
  ; (->> (canonicalize-user-req create-user-req)
  (-> (db/insert! User create-user-req)
      :id
      id->created))

; Get user handler
(defn get-user-handler [user-id]
  (-> (User user-id)
      ; (dissoc :password_hash)
      user->response))

; Login user handler
(defn login-user-handler [username password]
  (-> (User :username username :password password)
      user->response))

; Get all users handler
(defn get-users-handler []
  (-> (db/select User)
      ;  (map #(dissoc % :password_hash))
      ok))

; Update user handler
(defn update-user-handler [id update-user-req]
  (db/update! User id  update-user-req)
  (ok))


; Delete user handler
(defn delete-user-handler [user-id]
  (db/delete! User :id user-id)
  (ok))

; User routes
(def user-routes
  [(POST "/api/login" []
     :body [{:keys [username password]} LoginRequestSchema]
     (login-user-handler username password))
   (POST "/api/users" []
     :body [create-user-req UserRequestSchema]
     (create-user-handler create-user-req))
   (GET "/api/users/:id" []
     :path-params [id :- s/Int]
     (get-user-handler id))
   (GET "/api/users" []
     (get-users-handler))
   (PUT "/api/users/:id" []
     :path-params [id :- s/Int]
     :body [update-user-req UserRequestSchema]
     (update-user-handler id update-user-req))
   (DELETE "/api/users/:id" []
     :path-params [id :- s/Int]
     (delete-user-handler id))])

