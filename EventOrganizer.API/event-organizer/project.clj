(defproject event-organizer "0.1.0-SNAPSHOT"
  :description "Lightweight event organizer"
  :license {:name "EPL-2.0 OR GPL-2.0-or-later WITH Classpath-exception-2.0"
            :url "https://www.eclipse.org/legal/epl-2.0/"}
  :dependencies [[org.clojure/clojure "1.10.1"]

                  ;Web dependencies
                  [prismatic/schema "1.1.9"]
                  [metosin/compojure-api "2.0.0-alpha26"]
                  [ring/ring-jetty-adapter "1.6.3"]

                  ;Database dependencies
                  [toucan "1.1.9"]
                  [org.postgresql/postgresql "42.2.4"]

                  ;Password hashing
                  [buddy/buddy-hashers "1.3.0"]]
  :main ^:skip-aot event-organizer.core
  :target-path "target/%s"
  :profiles {:uberjar {:aot :all}})
