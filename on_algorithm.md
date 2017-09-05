Thinking out loud on algorithm

Officer assignment is not strictly speaking a stable marriage problem, because a single linefly squadron can receive more than one officer. We could create preferences for every unique billet to be filled, but that would require a lot of redundant workload. So it's better to formulate this problem as a [college-admission problem](http://cramton.umd.edu/market-design/gale-shapley-college-admissions.pdf) and for linefly squadrons, we can simply give points for desirable traits and rank officers based on the points.

This differs from the formulation of the officer accession algorithm (i.e., assignment problem) where the objective function is maxmization, not a stable problem. A max-weight algorithm is not necessarily stable. An AFSC could prefer one cadet over another given all equal qualifications(order or merit, degree, etc.).

One thing that gets brought up often is that our new approach could mislead officers into thinking that they will all receive the jobs they want. But such claim undermines the intelligence of USAF officers. We all know that we always have to fill jobs at some undesirable location, e.g., long-term deployment at Al Udeid, and that this algorithm does not remove billets overseas. We can simply be more transparent on how these job matches go by using an algorithm.

A wikipedia [article](https://en.wikipedia.org/wiki/Stable_marriage_problem)

A good MIT lecture with an example to go through: [video](https://youtu.be/RE5PmdGNgj0)

|Billet|Preference||Officer|Preference|
|---|---|---|---|---|
|1|CBEAD||A|35214|
|2|ABECD||B|52143|
|3|DCBAE||C|43512|
|4|ACDBE||D|12345|
|5|ABDEC||E|23415|

