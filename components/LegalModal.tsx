import React from 'react';
import { X, ShieldCheck, Scale, FileText, Landmark, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export type LegalDocType = 'terms' | 'privacy' | 'waiver' | 'cookies';

interface LegalModalProps {
  isOpen: boolean;
  docType: LegalDocType | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, docType, onClose }) => {
  if (!isOpen || !docType) return null;

  const getDocContent = () => {
    switch (docType) {
      case 'terms':
        return {
          title: 'Terms of Service',
          icon: <Landmark className="text-amber-500" size={24} />,
          subtitle: 'Last updated: July 2026',
          sections: [
            {
              heading: '1. Membership Agreements',
              text: 'By registering as a member of Challenger Gym 2, you agree to comply with all rules, guidelines, and dress codes established by the facility. Memberships are strictly personal, non-transferable, and require a valid digital passcode or physical barcode for access to the training grounds.'
            },
            {
              heading: '2. Payment Terms & Billing Cycle',
              text: 'All subscription fees (Basic Plan, Premium Plan, and Elite Plan) are billed automatically in advance on a recurring monthly cycle. If payment authorization fails, club access will be suspended after a 3-day grace period. You may self-cancel or update card information securely via the portal.'
            },
            {
              heading: '3. Cancellation & Refunds Policy',
              text: 'We maintain an absolute transparent cancel-anytime policy. To avoid being charged for the subsequent cycle, cancellations must be requested at least 48 hours prior to your monthly renewal date. Already processed monthly subscription fees are non-refundable.'
            },
            {
              heading: '4. Code of Conduct on the Training Floor',
              text: 'Members must behave with absolute respect. Barbells and heavy plates must not be dropped violently outside specified lifting platforms. Re-racking weights is mandatory. Proper athletic footwear is required at all times. Failure to comply can result in immediate termination of membership without refund.'
            }
          ]
        };
      case 'privacy':
        return {
          title: 'Privacy Charter',
          icon: <ShieldCheck className="text-amber-500" size={24} />,
          subtitle: 'Last updated: July 2026',
          sections: [
            {
              heading: '1. Information We Collect',
              text: 'Challenger Gym 2 collects personal registration credentials (name, email, telephone), payment card metadata, check-in timestamps, class booking registers, and voluntary biometric tracking logs (such as water intake, workout duration, and daily physical state) that you choose to submit.'
            },
            {
              heading: '2. How We Safeguard Your Data',
              text: 'All data transmissions are fully encrypted using standard transport security protocols (TLS 1.3). Payment processing is proxied securely under strict PCI-DSS compliance. Your voluntary workout and wellness logs are stored in secure storage compartments and are never shared with any third-party medical or insurance companies.'
            },
            {
              heading: '3. Digital Integrations & Tracking',
              text: 'We leverage analytics to optimize schedule displays and understand facility capacity metrics. This data is handled strictly in aggregate format. No personal identifiers are attached to general telemetry.'
            },
            {
              heading: '4. Member Control & Rights',
              text: 'You maintain absolute ownership over your profile. You can download your training logs, request a complete export of your check-in history, or request immediate irreversible erasure of all personal files by contacting our data protection officer at privacy@challengergym2.in.'
            }
          ]
        };
      case 'waiver':
        return {
          title: 'Liability Waiver & Release',
          icon: <Scale className="text-amber-500" size={24} />,
          subtitle: 'Last updated: July 2026',
          sections: [
            {
              heading: '1. Assumption of Risk',
              text: 'You acknowledge that heavy strength training, high-intensity aerobic intervals, calisthenics, powerlifting, and explosive bodybuilding conditioning carry inherent risks of severe physical injury, cardiovascular strain, or joint damage. By utilizing the facility, you voluntarily assume all associated risks.'
            },
            {
              heading: '2. Medical & Physical Clearance',
              text: 'You warrant that you are in good physical health and have no undisclosed medical diagnoses or physical limitations that would make rigorous physical exercise dangerous. We strongly urge all members to undergo regular physical check-ups prior to initiating heavy progressive overload regimes.'
            },
            {
              heading: '3. Full Release & Hold Harmless',
              text: 'You hereby release, waive, discharge, and hold harmless Challenger Gym 2, its corporate entities, certified coaching staff, and third-party affiliates from any and all liability, claims, or demands arising out of physical injury, property loss, or accidental damage sustained on the premises.'
            },
            {
              heading: '4. Emergency Medical Treatment',
              text: 'In the event of an urgent health crisis or severe injury on the training floor, you authorize Challenger Gym 2 personnel to secure necessary emergency medical transportation and treatment. Any emergency room or paramedic expenses incurred are your sole responsibility.'
            }
          ]
        };
      case 'cookies':
        return {
          title: 'Cookie Policy',
          icon: <FileText className="text-amber-500" size={24} />,
          subtitle: 'Last updated: July 2026',
          sections: [
            {
              heading: '1. What Are Cookies?',
              text: 'Cookies are small text documents stored directly on your browser or device when visiting Challenger Gym 2 portals. They enable our system to remember your active session, keep track of classes you have booked, and load custom dashboard stats efficiently.'
            },
            {
              heading: '2. Essential vs. Analytical Cookies',
              text: 'Essential Cookies are required to keep you signed in, manage payment forms securely, and authorize barcodes. Analytical Cookies help us measure peak times, understand which classes are popular, and optimize portal load speeds. You may opt-out of analytical tracking anytime.'
            },
            {
              heading: '3. Managing Cookie Preferences',
              text: 'Most web browsers allow you to disable, delete, or selectively accept cookies via settings. However, blockading all cookies will result in critical loss of booking functions, automated digital pass generation, and offline tracking features.'
            }
          ]
        };
      default:
        return null;
    }
  };

  const doc = getDocContent();
  if (!doc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
      ></motion.div>

      {/* Modal Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative bg-stone-900 border border-stone-800 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl text-white flex flex-col max-h-[85vh]"
      >
        {/* Header banner */}
        <div className="p-6 border-b border-stone-850 flex justify-between items-center shrink-0 bg-stone-950/40">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-stone-900 border border-stone-800 rounded-lg shrink-0">
              {doc.icon}
            </div>
            <div>
              <h3 className="text-xl font-black font-sans tracking-tight text-white">{doc.title}</h3>
              <div className="flex items-center gap-1.5 text-[10px] text-stone-500 uppercase tracking-wider font-bold mt-0.5">
                <Clock size={10} />
                <span>{doc.subtitle}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-850 hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Document Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/10 flex items-start gap-3">
            <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5 shrink-0 animate-pulse"></div>
            <p className="text-[11px] text-stone-400 leading-relaxed font-light">
              You are reviewing the legally binding charter of Challenger Gym 2. Please read carefully. Usage of our facilities, online calculators, booking engines, and physical space implies automatic consent.
            </p>
          </div>

          <div className="space-y-6">
            {doc.sections.map((sect, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-1.5">
                  <span className="text-amber-500 text-xs font-mono">0{idx + 1}.</span>
                  {sect.heading}
                </h4>
                <p className="text-xs text-stone-300 font-light leading-relaxed">
                  {sect.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-stone-850 flex flex-col sm:flex-row gap-4 justify-between items-center shrink-0 bg-stone-950/40">
          <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">
            Challenger Gym 2 Legal Compliance &bull; Nagpur, IN
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-black uppercase tracking-widest rounded-lg transition-colors cursor-pointer shadow-lg shadow-amber-500/15"
          >
            I Accept &amp; Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
