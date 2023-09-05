import randomString from "randomstring";

export class TextGenerator {
  makeString(length: number, useCase=''): string {
    let result = "";
    let characters;

    switch(useCase) {
      case 'lower':
          characters =
          "abcdefghijklmnopqrstuvwxyz";
          break;
      case 'upper':
          characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
      case 'upperAndNumber':
          characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
          break;
      case 'lowerAndNumber':
          characters =
          "abcdefghijklmnopqrstuvwxyz0123456789";
          break;
      case 'number':
          characters =
          "0123456789";
          break;
      case 'upperAndLower':
          characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
          break;
      case 'specialCharacters':
          characters =
          ":!$&'()*+/,-.:;=[\]^_`{|}~";
          break;
      case 'lowerUpperNumberSpecial':
          characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789:!$&'()*+/,-.:;=[\]^_`{|}~";
          break;
      case 'cyrillic':
          characters =
          "АаБбВвГгДдЕеЖжЗзИиЙйКкЛлМмНнРрСсТтУуФфХхЦцЧчШшЩщЬьЭэЮюЯя";
          break;
      case 'romanNumerals':
          characters =
          "IVXLCDM";
          break;

      default: 
        characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    }
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  getEmail(): string {
    return this.makeString(5) + "@gmail.com";
  }

  getPassword(length: number): string {
    const numOfSymbols: number = Math.ceil(length/3);
    const upperCaseLetters: string = randomString.generate({ length: numOfSymbols, charset: 'alphabetic', capitalization: 'uppercase'});
    const lowerCaseLetters: string = randomString.generate({ length: numOfSymbols, charset: 'alphabetic', capitalization: 'lowercase'});
    const numbers: number = randomString.generate({ length: numOfSymbols, charset: 'numeric' });
    const password: string = upperCaseLetters + lowerCaseLetters + numbers;
    return password.slice(0, length);
  }

  getID(): string {
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const separators = "-";
    function getRandomCharacter(characters) {
      return characters[Math.floor(Math.random() * characters.length)];
    }
    const randomString =
      `${getRandomCharacter(letters)}${getRandomCharacter(letters)}` +
      `${separators}` +
      `${getRandomCharacter(numbers)}${getRandomCharacter(numbers)}` +
      `${separators}` +
      `${getRandomCharacter(numbers)}${getRandomCharacter(numbers)}` +
      `${separators}` +
      `${getRandomCharacter(numbers)}${getRandomCharacter(numbers)}` +
      `${separators}` +
      `${getRandomCharacter(letters)}`;
    return randomString;
  }

  getName(): string {
    const firstNames = ["John", "Jane", "Michael", "Emily", "David", "Sarah"];
    return firstNames[Math.floor(Math.random() * firstNames.length)];
  }

  getLastName(): string {
    const lastNames = [
      "Smith",
      "Johnson",
      "Williams",
      "Jones",
      "Brown",
      "Davis",
    ];
    return lastNames[Math.floor(Math.random() * lastNames.length)];
  }

  getCode() {
    //currently using a permanent code
    return "133710";
  }
}
