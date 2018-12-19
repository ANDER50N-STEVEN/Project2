CREATE TABLE markers (
  id SERIAL NOT NULL PRIMARY KEY ,
  address VARCHAR( 80 ) NOT NULL ,
  lat FLOAT( 10 ) NOT NULL ,
  lng FLOAT( 10 ) NOT NULL ,
  price INT NOT NULL,
  bed INT NOT NULL,
  bath INT NOT NULL
);


INSERT INTO markers (address, lat, lng, price, bed, bath) VALUES
('580 Darling Street, Rozelle, NSW',-33.861034,151.171936, 800, 1 , 1),
('76 Wilford Street, Newtown, NSW',-33.898113,151.174469,650, 1 , 0),
('Greenwood Plaza, 36 Blue St, North Sydney NSW ',-33.840282,151.207474, 1100, 3, 2),
('7A, 2 Huntley Street, Alexandria, NSW',-33.910751,151.194168, 980, 2, 2),
('16 Foster Street, Surry Hills, NSW',-33.879917,151.210449,999, 2, 1),
('43 Macpherson Street, Bronte, NSW',-33.906357,151.263763,1050, 2, 1),
('60-64 Reservoir Street, Surry Hills, NSW',-33.881123,151.209656, 899, 2 , 2),
('60 Riley Street, Darlinghurst, NSW',-33.874737,151.215530,1800, 4, 3);


CREATE USER steven WITH PASSWORD 'password';
GRANT SELECT, INSERT, UPDATE ON markers TO steven;
GRANT USAGE, SELECT ON SEQUENCE markers_id_seq TO steven;
