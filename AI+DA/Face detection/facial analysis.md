**Face detection** involves identifying regions of an image that contain a human face, typically by returning _bounding box_ coordinates that form a rectangle around the face, like this:

![An image with two faces highlighted in rectangles](https://learn.microsoft.com/en-gb/training/wwl-data-ai/detect-analyze-faces/media/face-detection.png)

With **Face analysis**, facial features can be used to train machine learning models to return other information, such as facial features such as nose, eyes, eyebrows, lips, and others.

![facial landmarks image showing data around face characteristics](https://learn.microsoft.com/en-gb/training/wwl-data-ai/detect-analyze-faces/media/landmarks-1.png)

## Facial recognition

A further application of facial analysis is to train a machine learning model to identify known individuals from their facial features. This is known as _facial recognition_, and uses multiple images of an individual to train the model. This trains the model so that it can detect those individuals in new images on which it wasn't trained.

![A person identified as "Wendell"](https://learn.microsoft.com/en-gb/training/wwl-data-ai/detect-analyze-faces/media/facial-recognition.png)

When used responsibly, facial recognition is an important and useful technology that can improve efficiency, security, and customer experiences. Next we'll explore **Azure AI Face** service, which provides pre-trained models to detect, recognize, and analyze faces.