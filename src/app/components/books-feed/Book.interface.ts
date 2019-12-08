export interface BookResult {
  kind: string;
  totalItems: number;
  items?: [
    {
      accessInfo: any;
      etag: any;
      kind: string;
      salseInfo: any;
      searchInfo: any;
      id: string;
      selfLink: string;
      volumeInfo: {
        title: string;
        allowAnonLogging: boolean;
        authors: string[];
        averageRating: number;
        canonicalVolumeLink: string;
        categories: string[];
        contentVersion: string;
        description: string;
        imageLinks: {
          smallThumbnail: string;
          thumbnail: string;
        };
        industryIdentifiers: [{ type: string; identifier: string }];
        infoLink: string;
        language: string;
        maturityRating: string;
        pageCount: number;
        previewLink: string;
        printType: string;
        publishedDate: string;
        publisher: string;
        ratingsCount: number;

        subtitle: string;
        readingModes: {
          image: boolean;
          text: boolean;
        };
      };
    }
  ];
}
export interface Book {
  accessInfo: any;
  etag: any;
  kind: string;
  salseInfo: any;
  searchInfo: any;
  id: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    allowAnonLogging: boolean;
    authors: string[];
    averageRating: number;
    canonicalVolumeLink: string;
    categories: string[];
    contentVersion: string;
    description: string;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
    industryIdentifiers: [{ type: string; identifier: string }];
    infoLink: string;
    language: string;
    maturityRating: string;
    pageCount: number;
    previewLink: string;
    printType: string;
    publishedDate: string;
    publisher: string;
    ratingsCount: number;

    subtitle: string;
    readingModes: {
      image: boolean;
      text: boolean;
    };
  };
}
