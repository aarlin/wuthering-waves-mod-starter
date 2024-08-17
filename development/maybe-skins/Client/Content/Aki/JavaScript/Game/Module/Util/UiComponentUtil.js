"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiComponentUtil = void 0);
const UE = require("ue"),
	AudioController_1 = require("../../../Core/Audio/AudioController");
class UiComponentUtil {
	static SetStarActiveNew(t, e, o = void 0, n = !0) {
		var i = t.length,
			r = o ?? i;
		let l;
		for (let o = 0; o < i; ++o) {
			var a = t[o];
			a.SetActive(o + 1 <= r),
				o + 1 > r ||
					(a.SetImgStarOnActive(o < e),
					n
						? (a.SetImgStarNextActive(o === e),
							o === e && (l = a),
							a.SetImgStarOffActive(o > e))
						: (a.SetImgStarNextActive(!1),
							a.SetImgStarOffActive(o >= e),
							o === e - 1 && (l = a)));
		}
		return l;
	}
	static SetMoneyState(t, e, o, n) {
		return (
			t.SetText(o.toString()),
			(o = o <= n),
			e.SetText(n.toString()),
			e.SetChangeColor(o, e.changeColor),
			(t.useChangeColor = !o),
			o
		);
	}
	static BindAudioEvent(t) {
		(t instanceof UE.UIButtonComponent || t instanceof UE.UIExtendToggle) &&
			t.OnPostAudioStateEvent.Bind((e, o) => {
				AudioController_1.AudioController.PostSelectableAudioEvent(
					o,
					t.GetOwner(),
				);
			});
	}
	static UnBindAudioEventByName(t) {
		AudioController_1.AudioController.StopSelectableAudioEventByName(t);
	}
	static UnBindAudioEvent(t) {
		AudioController_1.AudioController.StopSelectableAudioEvent(t.GetOwner());
	}
}
exports.UiComponentUtil = UiComponentUtil;
