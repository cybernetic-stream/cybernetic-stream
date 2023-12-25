import SwiftUI
import UIKit

class CustomHostingController: UIHostingController<ContentView> {
    override var prefersStatusBarHidden: Bool {
        return true
    }
}

